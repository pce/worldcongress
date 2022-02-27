// import { useEffect, useState } from "react";

type ButtonsProps = {
  onSave: any;
}

export default function Buttons({ onSave }: ButtonsProps) {

  return <>
    <input type="button" value="save" onClick={onSave} className="content-button" />
  </>
}

