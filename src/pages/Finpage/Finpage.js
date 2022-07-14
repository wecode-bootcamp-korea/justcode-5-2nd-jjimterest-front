import React, { useState } from 'react';
import Createpinfeed from '../../components/Createpinfeed/Createpinfeed';
import Nav from '../../components/Nav/Nav';
import css from './Finpage.module.scss';

function Finpage() {
  const [add, setAdd] = useState([{ increment: 1 }]);

  const plus = () => {
    setAdd(prev => {
      return [...prev, { increment: prev.length + 1 }];
    });
  };

  const deletepin = index => {
    setAdd(prev => {
      return prev.filter(num => num.increment !== index);
    });
  };
  return (
    <>
      <Nav />
      <div className={css.container}>
        <button className={css.create} onClick={plus}>
          Add
        </button>
        {add.map(add => {
          return (
            <Createpinfeed
              key={add.increment}
              index={add.increment}
              deletepin={deletepin}
            />
          );
        })}
      </div>
    </>
  );
}

export default Finpage;
