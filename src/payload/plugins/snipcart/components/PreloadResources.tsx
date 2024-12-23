import ReactDOM from 'react-dom'

const PreloadResources = () => {
  ReactDOM.preconnect('https://app.snipcart.com')
  ReactDOM.preconnect('https://cdn.snipcart.com')

  return (
    <>
      {/* Add stylesheet */}
      <link
        rel='stylesheet'
        href='https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css'
      />
    </>
  )
}

export default PreloadResources
