/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import './Card.styles.css'

const Card = ({ order }) => {
  const { client_name, table, createdAt, processedAt, status, id, Products } =
    order
  const dtcreatedAt = new Date(createdAt)
  const dtprocessedAt = new Date(processedAt)
  const orderTime = `${dtcreatedAt.toLocaleDateString()} - ${dtcreatedAt.getHours()}:${dtcreatedAt.getMinutes()}`
  const preparationSecond = Math.abs(dtprocessedAt) - dtcreatedAt
  const preparationMinutes = Math.floor(preparationSecond / 1000 / 60)
  const ṕreparationTime =
    preparationMinutes > 0 ? `${preparationMinutes}min` : '0min'

  return (
    <section className='card-container-text'>
      <section className='header'>
        <div className='card-table-info'>
          <p className='title-card'>Table</p>
          <p className='title-number-card'>{table}</p>
        </div>

        <div>
          <p className='title-card'>
            Order Number: <span className='text-card'>{id}</span>
          </p>
          <p className='title-card'>
            Client: <span className='text-card'>{client_name}</span>
          </p>
          <p className='title-card'>
            Order Time: <span className='text-card'>{orderTime}</span>
          </p>
          <p className='title-card'>
            Status: <span className='text-card'>{status}</span>
          </p>
          {status !== 'finished' && (
            <p className='title-card'>
              Preparation time:{' '}
              <span className='text-card'>{ṕreparationTime}</span>
            </p>
          )}
        </div>
      </section>

      <hr />

      <table key={Math.random()}>
        <tbody>
          <tr className='title-card'>
            <td colSpan='2'>
              <h4 className='title-card'>ORDER SUMMARY:</h4>
            </td>
          </tr>
          <tr>
            <td style={{ width: '70px' }} className='title-card'>
              QT
            </td>
            <td className='title-card'>PRODUCTS</td>
          </tr>
          {Products.map(({ name, flavor, qtd, complement }) => (
            <tr key={Math.random()}>
              <td className='text-card'>{qtd}</td>
              <td>
                <p className='text-card'>{name}</p>
                <p className='complement-text-card'>{flavor}</p>
                <p className='complement-text-card'>{complement}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

Card.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  order: PropTypes.object.isRequired,
}

export default Card
