import { Ref, useEffect, useState } from "react";
import Buttons from "./Buttons";
// import { Socket } from "socket.io-client";


type TextAreaProps = {
  // socketRef: Ref<Socket>
  socketRef: any;
}


export default function TextArea({ socketRef }: TextAreaProps) {
  const [text, setText] = useState("");
  let API_URL = `https://${window.location.hostname}`;
  if (window.location.hostname === 'localhost') {
    API_URL = `http://${window.location.hostname}:8080`;
  }
  let title = window.location.pathname.replace("/room/", "");
 
  
  const onChangeText = (evt: any) => {
    console.log("val:", evt.target.value)
    socketRef.current.emit('text:update',  evt.target.value);
  };

  const onSave = (evt: any) => {
    console.log("save:", evt.target.value)

    fetch(`${API_URL}/docs`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, text})
    }).then(res => res.json())
      .then(res => console.log(res));

  };


  useEffect(() => {
    socketRef.current.on('text:update', (text:any) => {
      // const data = JSON.parse(evt.data);
      console.log('received: %s', text);
      setText(text);
    });
  }, [socketRef]);
  
  useEffect(() => {
    // get the saved document of room
    fetch(`${API_URL}/docs/${title}`).then((res) => res.json()).then((json) => {
      console.log(json)
      let text = json[json.length-1].text;
      console.log('received: %s', text);
      setText(text);
    })
  }, []);
   
  return <>
    <h1 className="content-headline">{title} <Buttons onSave={onSave} /></h1>
    <textarea rows={12} value={text} onChange={onChangeText} className="content-textarea" />
  </>
}

