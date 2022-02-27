import { Ref, useEffect, useState } from "react";
import Buttons from "./Buttons";
// import { Socket } from "socket.io-client";


type TextAreaProps = {
  // socketRef: Ref<Socket>
  socketRef: any;
}

export default function TextArea({ socketRef }: TextAreaProps) {
  const [text, setText] = useState("");

  const onChangeText = (evt: any) => {
    console.log("val:", evt.target.value)
    socketRef.current.emit('text:update',  evt.target.value);
  };

  const onSave = (evt: any) => {
    console.log("save:", evt.target.value)
  };


  useEffect(() => {
    socketRef.current.on('text:update', (text:any) => {
      // const data = JSON.parse(evt.data);
      console.log('received: %s', text);
      setText(text);
    });
  }, [socketRef]);


  return <>
    <h1 className="content-headline">Lernen</h1>
    <Buttons onSave={onSave} />
    <textarea rows={12} value={text} onChange={onChangeText} className="content-textarea" />
  </>
}

