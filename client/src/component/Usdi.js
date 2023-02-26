import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';

const Usdi = () => {
    const [title1, setTitle1] = useState("Select Branch");
  const [title2, setTitle2] = useState("Select Batch");
  return (
    <div>
    <Dropdown className="py-2">
                  <Dropdown.Toggle className="dropdownBox" id="dropdown-basic">
                    {title1}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTitle1("Industrial Design")}>Industrial Design</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTitle1("Interaction Design")}>Interaction Design</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTitle1("Interior Design")}>Interior Design</Dropdown.Item>
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

export default Usdi