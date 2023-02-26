import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";

const Usar = () => {
    const [title1, setTitle1] = useState("Select Branch");
  const [title2, setTitle2] = useState("Select Batch");
  return (
    <div>
    <Dropdown className="py-2">
                  <Dropdown.Toggle className="dropdownBox" id="dropdown-basic">
                    {title1}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTitle1("Artificial Intelligence and Data Science")}>Artificial Intelligence and Data Science</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTitle1("Artificial Intelligence and Machine Learning")}>Artificial Intelligence and Machine Learning</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTitle1("Industrial internet of things")}>Industrial internet of things</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTitle1("Automation and Robotics")}>Automation and Robotics</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown className="py-2">
                  <Dropdown.Toggle className="dropdownBox" id="dropdown-basic">
                    {title2}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTitle2("Batch 1")}>Batch 1</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTitle2("Batch 2")}>Batch 2</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
    </div>
  )
}

export default Usar