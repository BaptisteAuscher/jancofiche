import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Highlight ({children : text = "", tags}) {
  if (!tags?.length) return text
  const matches = [...text?.matchAll(new RegExp(tags?.join("|"), "ig"))]
  if (!matches.length) return text

  const startText = text.slice(0, matches[0]?.index)

  return (
    <>
      {startText}
      {
        matches?.map((match, i) => {
          const highlight = text.slice(match.index, match.index + match[0].length)
          const nextText = text.slice(match.index + match[0].length, matches[i+1]?.index)
          return (
            <>
              <mark key={i}>{highlight}</mark>
              {nextText}
            </>
          )
        })
      }
    </>
  )
}

function App() {
  const [fiches, setFiches] = useState([])
  const [search, setSearch] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [mask, setMask] = useState([])
  const [keywords, setKeywords] = useState([])

  function prefixAnalys (searchAnalysis) {
    let prefixMask
    let keyWords = searchAnalysis.filter((item, i) => i != 0)
    if (searchAnalysis[0] == "o") {
      prefixMask = fiches.map((fiche) => fiche.type == "Ordre de grandeur")
    } else if (searchAnalysis[0] == "d") {
      prefixMask = fiches.map((fiche) => fiche.type == "Dates et évènements")
    } else if (searchAnalysis[0] == "c") {
      prefixMask = fiches.map((fiche) => fiche.type == "Conversion")
    } else if (searchAnalysis[0] == "def") {
      prefixMask = fiches.map((fiche) => fiche.type == "Définitions")
    } else if (searchAnalysis[0] == "i") {
      prefixMask = fiches.map((fiche) => fiche.type == "Infos importantes")
    }
    else {
      prefixMask = fiches.map((fiche) => true)
      keyWords = searchAnalysis
    }
    return {prefixMask, keyWords}
  }

  useEffect(() => {
    setMask(fiches.map((fiche) => true))
    if (search && search !== "") {
      let searchAnalysis = search.split(" ")
      const {prefixMask, keyWords} = prefixAnalys(searchAnalysis)
      setMask(prefixMask)
      setKeywords(keyWords)
      
      setFiches(prev => {
        return prev.map((fiche) => {
          let score = 0
          keyWords.map((word) => {
            if (word.length >= 1) {
              if (fiche.question.toLowerCase().includes(word.toLowerCase())) {
                score += word.length
              }
              if (fiche.answer.toLowerCase().includes(word.toLowerCase())) {
                score += word.length
              }

            }
          })
          return {...fiche, score}
        })})
      
    }

  }, [search])


  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  
  useEffect(() => {
    fetch("https://janco-fiche-server.onrender.com/fiche").then((res) => res.json()).then((data) => {
      setFiches(data.map((fiche) => {
        let score = 0
        return {...fiche, score}
      }))
      setIsLoading(false)
      setSearch("")
    })
  }, [])

  function compareScore (a,b) {
    return -(a.score - b.score);
  }

  return (
    <>
      <input type="text" name="search" onChange={handleChange} id="search" placeholder="Recherche"/>
      <div className="content">
        {isLoading ? "Chargement ..." : search}
        {isLoading ? "Chargement ..." : fiches.sort(compareScore).filter((item,i) => mask[i]).map((fiche, index) => {
          if (search.length < 5) {
            return <div className="fiche" key={index}><span className="type">{fiche.type}</span><span className="question"><Highlight tags={keywords} className="question">{fiche.question}</Highlight></span><span className="answer"><Highlight className="answer" tags={keywords}>{fiche.answer}</Highlight></span></div>
            }
          else if (fiche.score && fiche.score > 0) {
            return <div className="fiche" key={index}><span className="type">{fiche.type}</span><span className="question"><Highlight tags={keywords} className="question">{fiche.question}</Highlight></span><span className="answer"><Highlight className="answer" tags={keywords}>{fiche.answer}</Highlight></span></div>
          }
        })}
      </div>
    </>
  )
}

export default App
