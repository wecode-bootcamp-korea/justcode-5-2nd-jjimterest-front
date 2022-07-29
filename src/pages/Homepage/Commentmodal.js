import React from 'react';
import Comment from './Comment';
import css from './Commentmodal.module.scss';

const Commentmodal = ({ pinData, pinId }) => {
  const nestedcomments = pinData.filter(data => data.parent_id !== null);

  return (
    <div className={css.container}>
      <div className={css.commentList}>
        {pinData !== null &&
          pinData
            .filter(data => data.parent_id === null)
            .map(data => {
              return (
                <Comment
                  key={data.id}
                  data={data}
                  pinId={pinId}
                  nestedcomments={nestedcomments.filter(
                    filterData => filterData.parent_id === data.id
                  )}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Commentmodal;
