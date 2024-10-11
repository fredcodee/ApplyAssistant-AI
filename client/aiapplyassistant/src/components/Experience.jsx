import React, { useState } from 'react'

const Experience = ({ experience, setExperience }) => {
    const [exp, setExp] = useState([{ yearRange: "", role: "", description: "", accomplishments: "" }]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newExp = [...exp];
        newExp[index][name] = value;
        setExp(newExp);
        setExperience(newExp);
      };
    
      const addExperience = () => {
        setExp([...exp, { yearRange: "", role: "", description: "", accomplishments: "" }]);
      };
    
      const removeExperience = (index) => {
        const newExp = exp.filter((_, i) => i !== index);
        setExp(newExp);
        setExperience(newExp);
      };

  return (
  <div>
      <h3>Experience</h3>
      {exp.map((item, index) => (
        <div key={index}>
          <div>
            <label>Year Range</label>
            <input
              type="text"
              name="yearRange"
              value={item.yearRange}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g., 2020-2021"
            />
          </div>
          <div>
            <label>Role and Company</label>
            <input
              type="text"
              name="role"
              value={item.role}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g., Software Engineer at XYZ"
            />
          </div>
          <div>
            <label>Company Description</label>
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          <div>
            <label>Accomplishments</label>
            <textarea
              name="accomplishments"
              value={item.accomplishments}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          <button type="button" onClick={() => removeExperience(index)}>
            Remove Experience
          </button>
        </div>
      ))}
      <button type="button" onClick={addExperience}>
        Add Experience
      </button>
    </div>
  )
}

export default Experience