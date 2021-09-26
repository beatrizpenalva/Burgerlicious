/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react'

const CardsHeader = ({ children }) => {
  const { client_name, table, createdAt, processedAt, status, id } = children
  const dtcreatedAt = new Date(createdAt)
  const dtprocessedAt = new Date(processedAt)
  const orderTime = `${dtcreatedAt.toLocaleDateString()} - ${dtcreatedAt.getHours()}:${dtcreatedAt.getMinutes()}`
  const preparationSecond = Math.abs(dtprocessedAt) - dtcreatedAt
  const preparationMinutes = Math.floor(preparationSecond / 1000 / 60)
  const ṕreparationTime =
    preparationMinutes > 0 ? `${preparationMinutes}min` : '0min'

  return (
    <>
      <div>
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
      </div>
    </>
  )
}

export default CardsHeader
