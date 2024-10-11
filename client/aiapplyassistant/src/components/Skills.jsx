import React, { useState } from "react";

function SkillInput({ skills, setSkills }) {
  const [skillList, setSkillList] = useState([""]);

  const handleSkillChange = (index, e) => {
    const newSkills = [...skillList];
    newSkills[index] = e.target.value;
    setSkillList(newSkills);
    setSkills(newSkills);
  };

  const addSkill = () => {
    setSkillList([...skillList, ""]);
  };

  const removeSkill = (index) => {
    const newSkills = skillList.filter((_, i) => i !== index);
    setSkillList(newSkills);
    setSkills(newSkills);
  };

  return (
    <div>
      <h3>Skills</h3>
      {skillList.map((skill, index) => (
        <div key={index}>
          <input
            type="text"
            value={skill}
            onChange={(e) => handleSkillChange(index, e)}
            placeholder="e.g., React, Node.js"
          />
          <button type="button" onClick={() => removeSkill(index)}>
            Remove Skill
          </button>
        </div>
      ))}
      <button type="button" onClick={addSkill}>
        Add Skill
      </button>
    </div>
  );
}

export default SkillInput;
