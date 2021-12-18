import { Ref, useEffect, useState } from "react";
// import { Socket } from "socket.io-client";


type ReactionsProps = {
  socketRef: any;
}

type Reactions = {
  [key: string]: number;
}

const defaultReactions: Reactions  = {'👍':0, '👎':0, '😄':0, '🎉':0, '😕':0, '❤️':0}; 

export default function Reactions({ socketRef  }: ReactionsProps) {

  const [reactions, setReactions] = useState<Reactions>(defaultReactions);

  useEffect(() => {
    socketRef.current.on('reactions:react', (text:any) => {
      // const data = JSON.parse(evt.data);
      console.log('received: %s', text);
      setReactions((prevState:Reactions) => { 
        prevState[text]++;
        return prevState;
      });
      console.log(reactions);
    });
  }, [socketRef, reactions]);

  const onReaction = (i:string) => {
    socketRef.current.emit('reactions:react', i);
  }

  return <>
    {console.log(reactions)}
    <div className="reactions-list">
      <div className="reactions-list--emojis">
        {Object.keys(reactions).map((reaction, i) => {
          return <div key={i} onClick={()=>onReaction(reaction)}>{reaction} ({reactions[reaction]})</div>
        })}
      </div>
    </div>
  </>
}