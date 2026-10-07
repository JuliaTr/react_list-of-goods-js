import 'bulma/css/bulma.css';
import { useState } from 'react';
import classNames from 'classnames';

import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

function getPreparedGoods(goods, sortField) {
  const preparedGoods = [...goods];

  if (sortField === 'alpha') {
    preparedGoods.sort();
  }

  if (sortField === 'length') {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  let visibleGoods = getPreparedGoods(goodsFromServer, sortField);

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${classNames({ 'is-light': sortField !== 'alpha' })}`}
          onClick={() => setSortField('alpha')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${classNames({ 'is-light': sortField !== 'length' })}`}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${classNames({ 'is-light': reversed === false })}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {sortField || reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
