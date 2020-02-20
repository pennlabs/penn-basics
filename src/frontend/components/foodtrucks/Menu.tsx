import React from 'react'

import { Text } from '../shared'
import { IFormattedFoodtruck } from '../../../types/foodtrucks'

interface IMenuProps {
  foodtruckInfo: IFormattedFoodtruck
}

const Menu: React.FC<IMenuProps> = ({ foodtruckInfo }) => {
  const { menu, priceTypes, foodtruckID } = foodtruckInfo
  return (
    <div>
      <Text fullWidth>
        <strong>Menu</strong>
      </Text>

      <table className="table is-bordered is-fullwidth">
        <tbody>
          {menu.map(category => (
            <>
              {category.name}
              <br />
              <br />
              <tr>
                {priceTypes[category.name] ? <th> </th> : null}
                {priceTypes[category.name] &&
                  priceTypes[category.name].map((type, idx) => (
                    <th
                      style={{ fontSize: '80%' }}
                      key={`category-${foodtruckID}-header-${idx}`}
                    >
                      {type}
                    </th>
                  ))}
              </tr>
              {category.items.map((item, idx) => (
                <tr key={`category-${foodtruckID}-row-${idx}`}>
                  <td style={{ fontSize: '80%' }}>{item.name}</td>
                    {item.prices.map((price, priceIdx) => (
                      <td style={{ fontSize: '80%' }} key={`category-${foodtruckID}-price-${priceIdx}`}>
                        ${(Math.round(price * 100) / 100).toFixed(2)}
                      </td>
                    ))}
                </tr>
              ))}
              <br />
              <br />
              <br />
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Menu
