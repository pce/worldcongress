import { useEffect, useState } from "react";
// import { Socket } from "socket.io-client";


type TextAreaProps = {
  // socket: Socket
  socket: any;
}

export default function TextArea({ socket }: TextAreaProps) {
  const [text, setText] = useState("");



  const onChangeText = (evt: any) => {
    console.log("val:", evt.target.value)
    socket.current.emit('text',  evt.target.value);
  };

  useEffect(() => {
    socket.current.on('text', (text:any) => {
      // const data = JSON.parse(evt.data);
      console.log('received: %s', text);
      setText(text);
    });
  }, [socket]);


  return <>
    <textarea rows={12} value={text} onChange={onChangeText} />
  </>
}

