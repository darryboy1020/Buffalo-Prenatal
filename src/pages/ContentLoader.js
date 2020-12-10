import React from 'react'
import YAMLData from '../../content/content.yaml'

const ContentLoader = () => (
  <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
    <h1>{YAMLData.title}</h1>
    <ul>
      {YAMLData.content.map((data, index) => {
        return <li key={`content_item_${index}`}>{data.component}</li>
      })}
    </ul>
  </div>
)
export default ContentLoader
