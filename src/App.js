import React, { useState } from 'react'
import ReactDOMServer from 'react-dom/server';
import logo from './logo.svg';
import './App.css';
import { Layout, Button, Card } from 'antd'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { ReloadOutlined } from '@ant-design/icons'
// import Button from '@mui/material/Button';
import _quotes from './data/quotes.json'

const { Header, Content } = Layout

function App() {
  var authorNameForWiki = ""
  const [quote, setQuote] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const Quote = ({ text, author }) => {
    return (
      <span>
        <strong>{text}</strong> &nbsp; <span>{author}</span>
      </span>
    )
  }
  
  const getQuote = () => {
    setQuote([])
    setIsLoading(true)
    var randomIndex = Math.floor(Math.random() * _quotes.length);        
    setQuote(_quotes[randomIndex]) // citation aléatoire
    setIsLoading(false)

    var element = document.getElementById("quoteCard");
    element.classList.remove("hide");
  }

  authorNameForWiki = ReactDOMServer.renderToString(quote.author).replace(' ', '_');

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Content className="container">
            <Card
              id="quoteCard"
              className="hide"
              title={quote.author}
              bordered={false}
              extra={<a target="_blank" href={"https://fr.wikipedia.org/wiki/" + authorNameForWiki}>Qui est-ce ?</a>}
              style={{
                textAlign: "left",
                fontSize: 18,
                margin: "0 15px 0 15px",
                borderRadius: "10px"
              }}
            >
              <Quote text={quote.text} />
            </Card>
          </Content>
        </p>
        <Button
            onClick={() => getQuote()}
            type="primary" 
            shape="round" 
            icon={<ReloadOutlined />} 
            size="large">
            Générer une phrase
          </Button>
      </header>
    </div>
  );
}

export default App;
