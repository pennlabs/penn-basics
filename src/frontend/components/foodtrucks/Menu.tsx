import React from 'react'

import { Text } from '../shared'
import { IFormattedFoodtruck } from '../../../types/foodtrucks'

const Menu = ({ foodtruckInfo }: { foodtruckInfo: IFormattedFoodtruck }) => {
  const { menu, priceTypes } = foodtruckInfo
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
                  priceTypes[category.name].map(type => (
                    <th style={{ fontSize: '80%' }}> {type} </th>
                  ))}
              </tr>
              {category.items.map(item => (
                <tr>
                  <td style={{ fontSize: '80%' }}>{item.name}</td>
                  {item.prices.map(price => (
                    <td style={{ fontSize: '80%' }}>
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
