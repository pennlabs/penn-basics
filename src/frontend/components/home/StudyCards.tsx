import React from 'react'

interface IStudyCardsProps {
  name: string
  hours: string
  noise: number
  groups: number
  outlets: number
}

const StudyCards: React.FC<IStudyCardsProps> = ({ name, hours, noise, groups, outlets }) => {
  const renderNoise = (): React.ReactElement => {
    if (noise === 0) {
      return <span className="tag tag-is-blue">Silent</span>
    }

    if (noise === 1) {
      return <span className="tag tag-is-yellow">Moderate</span>
    }

    return <span className="tag tag-is-green">Loud</span>
  }

  const renderGroups = (): React.ReactElement => {
    if (groups === 0) {
      return <span className="tag is-info">No</span>
    }

    if (groups === 1) {
      return <span className="tag tag-is-yellow">Okay</span>
    }

    return <span className="tag tag-is-green">Yes</span>
  }

  const renderOutlets = (): React.ReactElement => {
    if (outlets === 0) {
      return <span className="tag is-info">None</span>
    }

    if (outlets === 1) {
      return <span className="tag tag-is-yellow">Sparse</span>
    }

    return <span className="tag tag-is-green">Plenty</span>
  }

  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <p className="is-size-6">
            <strong>{name}</strong>
            <br />
            <small>
              Hours:
              {hours}
            </small>

            <br />

            <small>
              Noise Level:
              {renderNoise()}
            </small>

            <br />

            <small>
              Good for groups:
              {renderGroups()}
            </small>

            <br />

            <small>
              Outlets:
              {renderOutlets()}
            </small>
          </p>
        </div>
      </div>
    </article>
  )
}

export default StudyCards
