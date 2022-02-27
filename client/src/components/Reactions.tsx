import { Ref, useEffect, useState } from "react";
// import { Socket } from "socket.io-client";


type ReactionsProps = {
  socketRef: any;
}

type Reactions = {
  [key: string]: number;
}

type Reaction = {
  count: number;
  icon: string;
  name?: string;
}

const defaultReactions: Reaction[] = [
  {icon:'👍', count:0}, 
  {icon:'👎', count:0}, 
  {icon:'😄', count:0}, 
  {icon:'🎉', count:0}, 
  {icon:'😕', count:0}, 
  {icon:'❤️', count:0}, 
];

export default function Reactions({ socketRef  }: ReactionsProps) {

  const [reactions, setReactions] = useState<Reaction[]>(defaultReactions);

  useEffect(() => {
    socketRef.current.on('reactions:react', (text:any) => {
      // const data = JSON.parse(evt.data);
      console.log('received: %s', text);
      setReactions((prevState:Reaction[]) => {
        
        prevState.map(e => {
          if(e.icon === text) {
            e.count = e.count + 1;
          }
        })
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
        {reactions.map((reaction, i) => {
          return <div key={i} onClick={()=>onReaction(reaction.icon)}>{reaction.icon} ({reaction.count})</div>
        })}
      </div>
    </div>
  </>
}