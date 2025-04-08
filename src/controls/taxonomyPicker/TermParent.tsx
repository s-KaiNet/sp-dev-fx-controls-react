import * as React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { ITermParentProps, ITermParentState } from './ITaxonomyPicker';
import { ITerm, ITermsTree } from '../../services/ISPTermStorePickerService';
import { TERMSET_IMG, TERM_IMG } from './TaxonomyPicker';

import styles from './TaxonomyPicker.module.scss';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import * as strings from 'ControlStrings';
import { TermTree } from './TermTree';

/**
 * Term Parent component, represents termset or term if anchorId
 */
export default class TermParent extends React.Component<ITermParentProps, ITermParentState> {

  private _terms: ITerm[];
  private _anchorName: string;

  constructor(props: ITermParentProps) {
    super(props);

    this._terms = this.props.termset.Terms;
    this.state = {
      loaded: true,
      expanded: true,
      collapseClickedTerm: null
    };
    this._handleClick = this._handleClick.bind(this);
  }

  /**
   * componentWillMount
   */
  public UNSAFE_componentWillMount(): void {
    // fix term depth if anchroid for rendering
    if (this.props.anchorId) {
      const anchorTerm = this._terms.filter(t => t.Id.toLowerCase() === this.props.anchorId.toLowerCase()).shift();
      if (anchorTerm) {
        // Append ';' separator, as a suffix to anchor term path.
        const anchorTermPath = `${anchorTerm.PathOfTerm};`;
        this._anchorName = anchorTerm.Name;
        let anchorTerms: ITerm[] = this._terms.filter(t => t.PathOfTerm.substring(0, anchorTermPath.length) === anchorTermPath && t.Id !== anchorTerm.Id);

        anchorTerms = anchorTerms.map(term => {
          term.PathDepth = term.PathDepth - anchorTerm.PathDepth;

          return term;
        });

        this._terms = anchorTerms;
      }
    }
  }


  /**
   * Handle the click event: collapse or expand
   */
  private _handleClick(): void {
    this.setState({
      expanded: !this.state.expanded
    });
  }


  /**
   * The term set selection changed
   */
  private termSetSelectionChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.props.termSetSelectedChange(this.props.termset, isChecked);
  }

  /**
 * Converts a flat array of terms into a hierarchical tree structure
 * @param terms The flat array of terms
 * @returns An array of ITermsTree representing the root nodes with their children
 */
  private buildTermsTree(terms: ITerm[]):ITermsTree[] {
    // Create a map for quick term lookup by ID
    const termMap = new Map<string, ITermsTree>();
    const maxLevel = terms.reduce((maxDepth, currentTerm) => {
      return currentTerm.PathDepth > maxDepth ? currentTerm.PathDepth : maxDepth;
    }, 0);
    // First pass: create tree nodes for all terms
    terms.forEach(term => {
      termMap.set(term.Id, {
        term,
        children: [],
        parent: undefined,
        props: undefined
      });
    });

    // Second pass: establish parent-child relationships
    const rootTerms: ITermsTree[] = [];

    terms.forEach(term => {
      const termNode = termMap.get(term.Id);
      termNode.props = {
        term: termNode.term,
        termset: this.props.termset.Id,
        activeNodes: this.props.activeNodes,
        changedCallback: this.props.changedCallback,
        multiSelection: this.props.multiSelection,
        disabled: this.resolveDisalbedState(termNode.term),
        termActions: this.props.termActions,
        updateTaxonomyTree: this.props.updateTaxonomyTree,
        spTermService: this.props.spTermService,
        maxLevel: maxLevel
      }
      if (term.ParentId && termMap.has(term.ParentId)) {
        // This term has a parent in our collection, add it as a child
        const parentNode = termMap.get(term.ParentId);
        parentNode.children.push(termNode);
        termNode.parent = parentNode;

      } else {
        // This is a root term with no parent in our collection
        rootTerms.push(termNode);
      }
    });

    return rootTerms;
  }

  private resolveDisalbedState = (term: ITerm): boolean => {
    const disabledPaths = [];
    let disabled = false;
    if (this.props.disabledTermIds && this.props.disabledTermIds.length > 0) {
      // Check if the current term ID exists in the disabled term IDs array
      disabled = this.props.disabledTermIds.indexOf(term.Id) !== -1;
      if (disabled) {
        // Push paths to the disabled list
        disabledPaths.push(term.PathOfTerm);
      }
    }

    if (this.props.disableChildrenOfDisabledParents) {
      // Check if parent is disabled
      const parentPath = disabledPaths.filter(p => term.PathOfTerm.indexOf(p) !== -1);
      disabled = parentPath && parentPath.length > 0;
    }

    return disabled;
  }

  /**
   * Default React render method
   */
  public render(): JSX.Element {
    // Specify the inline styling to show or hide the termsets
    const styleProps: React.CSSProperties = {
      display: this.state.expanded ? 'block' : 'none'
    };

    let termElm: JSX.Element = <div />;

    // Check if the terms have been loaded
    if (this.state.loaded) {

      const termTree = this.buildTermsTree(this._terms);

      if (this._terms.length > 0) {

        termElm = (
          <div style={styleProps}>
            {
              termTree.map((termsTree) => {
                return <TermTree key={termsTree.term.Id}
                  {...termsTree}
                />;
              })
            }
          </div>
        );
      } else {
        termElm = <div className={`${styles.listItem} ${styles.term}`}>{strings.TaxonomyPickerNoTerms}</div>;
      }
    } else {
      termElm = <Spinner size={SpinnerSize.medium} />;
    }


    return (
      <div>
        <div className={`${styles.listItem} ${styles.termset} ${(!this.props.anchorId && this.props.isTermSetSelectable) ? styles.termSetSelectable : ""}`} onClick={this._handleClick}>
          {
            // Show the termset selection box
            (!this.props.anchorId && this.props.isTermSetSelectable) &&
            <Checkbox className={styles.termSetSelector}
              checked={this.props.activeNodes.filter(a => a.path === "" && a.key === a.termSet).length >= 1}
              onChange={this.termSetSelectionChange} />
          }
          <img src={this.props.anchorId ? TERM_IMG : TERMSET_IMG} alt={strings.TaxonomyPickerMenuTermSet} title={strings.TaxonomyPickerMenuTermSet} />
          {
            this.props.anchorId ?
              this._anchorName :
              this.props.termset.Name
          }
        </div>
        <div style={styleProps}>
          {termElm}
        </div>
      </div>
    );
  }
}
