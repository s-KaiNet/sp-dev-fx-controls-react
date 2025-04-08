import React, { useEffect, useState } from "react";
import { FC } from "react";
import Term from "./Term";
import { ITermsTree } from "../../services/ISPTermStorePickerService";
import styles from './TaxonomyPicker.module.scss';
import * as strings from 'ControlStrings';
import { COLLAPSED_IMG, EXPANDED_IMG } from "./TaxonomyPicker";
import { UpdateType } from "./termActions";

export const TermTree: FC<ITermsTree> = ({ props, term, children }) => {
  const [shouldRenderImg, setShouldRenderImg] = useState(true);
  const [expanded, setExpanded] = useState(term.PathDepth < 2);

  const onCollapseClick = (): void => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const shouldRenderImg = async (): Promise<boolean> => {
      if (!props.termActions.actions?.length || !children.length) {
        return true;
      }

      for (const child of children) {
        let childIsHidden = false;
        for (const action of props.termActions.actions) {
          const shouldApply = await action.applyToTerm(child.term, () => {
            // no-op
          }, () => {
            // no-op
          });
          if (shouldApply) {
            const result = await action.actionCallback(null, child.term);
            if (result.updateActionType === UpdateType.hideTerm) {
              childIsHidden = true;
              break;
            }
          }
        }
        if (!childIsHidden) {
          return true;
        }
      }

      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    shouldRenderImg().then((result) => {
      setShouldRenderImg(result);
    });
  }, []);

  return (
    <div className={styles.termTree}>
      {term.PathDepth < props.maxLevel && shouldRenderImg && <img onClick={onCollapseClick} src={expanded ? EXPANDED_IMG : COLLAPSED_IMG} alt={strings.TaxonomyPickerExpandTitle} title={strings.TaxonomyPickerExpandTitle} />}
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
