import React, { useState } from "react";

export const TagsInput = (props) => {
  const [tags, setTags] = useState(props.tags);
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    props.selectedTags([...tags]);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      let temp = false;
      console.log(temp);
      tags.map((item)=>{
        if(item===event.target.value){
            temp = true;
        }
      })
      console.log(temp);
      if(temp){
        alert("Do not use same tag")
      }else{
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
    }
  };
  return (
    <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span
              style={{color:"red"}}
              className="tag-close-icon"
              onClick={() => removeTags(index)}
            >
              clickmeToDelete
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
        placeholder="Press enter to add tags"
      />
    </div>
  );
};
