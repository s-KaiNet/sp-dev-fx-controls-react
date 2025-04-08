import React, { useEffect, useState } from "react";
import { FC } from "react";
import Term from "./Term";
import { ITerm, ITermsTree } from "../../services/ISPTermStorePickerService";
import styles from './TaxonomyPicker.module.scss';
import * as strings from 'ControlStrings';
import { COLLAPSED_IMG, EXPANDED_IMG } from "./TaxonomyPicker";
import { ITermAction, UpdateType } from "./termActions";

export const TermTree: FC<ITermsTree> = ({ props, term, children }) => {

  const findActiveDescendantRecursive = (nodes: ITermsTree[]): boolean => {
    for (const node of nodes) {
      // Check if this child is active
      if (props.activeNodes.some(activeNode => activeNode.key === node.term.Id)) {
        return true;
      }

      // Check its children recursively
      if (node.children && node.children.length > 0) {
        const hasActiveChild = findActiveDescendantRecursive(node.children);
        if (hasActiveChild) return true;
      }
    }
    return false;
  };

  const isActiveOrHasActiveDescendant = (): boolean => {
    // Check if current term is active
    const isCurrentTermActive = props.activeNodes.some(node => node.key === term.Id);

    // If current term is active, no need to check children
    if (isCurrentTermActive) return true;

    // Check if any descendant term is active
    const hasActiveDescendant = findActiveDescendantRecursive(children);

    return hasActiveDescendant;
  };

  const [hasVisibleChild, setHasVisibleChild] = useState(true);
  const [expanded, setExpanded] = useState(() => {
    return term.PathDepth < 1 || isActiveOrHasActiveDescendant();
  });

  const onCollapseClick = (): void => {
    setExpanded(!expanded);
  };

  const isHiddenByActions = async (term: ITerm, actions: ITermAction[]): Promise<boolean> => {
    for (const action of actions) {
      const shouldApply = await action.applyToTerm(term, () => {
        // no-op
      }, () => {
        // no-op
      });

      if (shouldApply) {
        const result = await action.actionCallback(null, term);
        if (result.updateActionType === UpdateType.hideTerm) {
          return true;
        }
      }
    }
    return false;
  }

  useEffect(() => {
    const hasVisibleChild = async (): Promise<boolean> => {
      if (!props.termActions.actions?.length) {
        return true;
      }

      for (const child of children) {
        const childIsHidden = await isHiddenByActions(child.term, props.termActions.actions);
        if (!childIsHidden) {
          return true;
        }
      }

      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    hasVisibleChild().then((result) => {
      setHasVisibleChild(result);
    });
  }, []);

  return (
    <div className={styles.termTree}>
      {term.PathDepth < props.maxLevel && hasVisibleChild && term.TermsCount > 0 && <img onClick={onCollapseClick} src={expanded ? EXPANDED_IMG : COLLAPSED_IMG} alt={strings.TaxonomyPickerExpandTitle} title={strings.TaxonomyPickerExpandTitle} />}
      <div>
        <Term {...props} />
        <div style={{ display: expanded ? 'block' : 'none' }}>
          {children.map((child) => {
            return (
              <div key={child.term.Id}>
                <TermTree {...child} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
