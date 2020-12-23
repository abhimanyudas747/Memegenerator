import {useState, useEffect} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import './memes.component.css'
import doge from '../doge.jpg'

export const MemeMaker = () => {
    const [memes, setMemes] = useState([]);
    const [memeUrl, setMemeUrl] = useState('');
    const [captions, setCaptions] = useState([]);
    const [memeIdx, setMemeIdx] = useState(0);
    //const [boxarr, setBoxarr] = useState([]);
    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes').then(response => response.json()).then(data => {setMemes(data.data.memes);
                                                                                                    setMemeUrl(data.data.memes[0].url);
                                                                                                    setCaptions(Array(data.data.memes[0].box_count).fill(''))
                                                                                                    
                                                                                                    })

    }, [])



    const randomize = (e) => {
        var newIdx = Math.floor(Math.random() * memes.length);
        while(newIdx == memeIdx)
        {
        newIdx = Math.floor(Math.random() * memes.length);
        }
        console.log(newIdx)
        
        setMemeIdx(newIdx);
        setCaptions(Array(memes[newIdx].box_count).fill(''));
        setMemeUrl(memes[newIdx].url)
    }

    useEffect(() => {
        let foo = captions.length > 0;
        // console.log(foo)
        // captions.forEach((c, idx) => {
        //     console.log(c)
        //     if(c.length === 0){
        //     foo = false
        // }})
        
        
        if(foo){
            
            generateMeme()
        }
    }, [captions])


    const updateCaptions = async(e) => {
        const newCaptions = [...captions];
        newCaptions[e.target.id] = e.target.value;
        setCaptions(newCaptions)
            
        
        
        
    }


    const generateMeme = (e) => {

        const formData = new FormData();
        formData.append('template_id', memes[memeIdx].id)
        formData.append('username', process.env.REACT_APP_IMGFLIP_USERID)
        formData.append('password', process.env.REACT_APP_IMGFLIP_PASSWORD)
        captions.forEach((cap, idx) => {if(cap===''){
                                            formData.append(`boxes[${idx}][text]`, ' ')
                                                }
                                            else{
                                                formData.append(`boxes[${idx}][text]`, cap)}})

        fetch('https://api.imgflip.com/caption_image', {
            method: "POST",
            body: formData
        })
        .then((resp) => resp.json()).then(data => setMemeUrl(data.data.url))

    }


    





    return (
        
        <div className="outer-div">
        <Row>
            <Col sm={12}>
            <div className="upper-div">
                <button className="button" onClick={randomize}>Random Template</button><br></br>
            

                {captions.map((e, i) => (<><input value={captions[i]} type="text" placeholder={"Text"+(i+1)} id={i} onChange={updateCaptions} /><br></br></>))}
            </div>

            </Col>
        </Row>
        <Row>
            <Col sm={12} className="memeholdercol">
        
                
                    {memeUrl.length ? <img src={memeUrl} className="memeholder" /> : <></>}
                
             
            </Col>
        </Row>
        <Row>
            <Col sm={12} style={{background: "none", textAlign: "center"}}>
                <a className="download-button" href={memeUrl} target="_blank">Download This Meme!</a><br></br>
            </Col>
        </Row>

        </div>
        



    )
}