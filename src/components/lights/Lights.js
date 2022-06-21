import Select from 'react-select'
import { useEffect, useState } from 'react'


export const LightsPage = () => {

  //     const localTextureUser = localStorage.getItem("texture_user")
  //     const textureUserObject = JSON.parse(localTextureUser)
  const [backdrops, setBackdrops] = useState([])
  const [props, setProps] = useState([])
  const [furnitures, setFurnitures] = useState([])
  const [lights, setLights] = useState([])
  // const [selectedOption, setSelectedOption] = useState([])
  const [selectedBackdropOption, setSelectedBackdropOption] = useState([])
  const [selectedPropOption, setSelectedPropOption] = useState([])
  const [selectedFurnitureOption, setSelectedFurnitureOption] = useState([])
  const [selectedLightOption, setSelectedLightOption] = useState([])
  const [backdropChoices, setBackdropChoices] = useState([])
  const [propChoices, setPropChoices] = useState([])
  const [furnitureChoices, setFurnitureChoices] = useState([])
  const [lightChoices, setLightChoices] = useState([])
  // const handleChange = e => {
  //   setSelectedOption(e);
  // }
  const handleBackdropChange = e => {
    setSelectedBackdropOption(e)
  }
  const handlePropChange = e => {
    setSelectedPropOption(e)
  }
  const handleFurnitureChange = e => {
    setSelectedFurnitureOption(e)
  }
  const handleLightChange = e => {
    setSelectedLightOption(e)
  }

  //     const [newRental, updateRental] = useState({

  //         userId: textureUserObject.id,
  //         bookingDateId: 0,
  //         backdropId: 0,
  //         propId: 0,
  //         furnitureId: 0,
  //         lightId: 0,
  //         totalcost: 0

  //     })

  useEffect(
    () => {
      fetch(`http://localhost:8080/backdrops`)
        .then(response => response.json())
        .then((backdropsArray) => {
          setBackdrops(backdropsArray)
        })
    },
    []
  )

  useEffect(
    () => {
      fetch(`http://localhost:8080/props`)
        .then(response => response.json())
        .then((propsArray) => {
          setProps(propsArray)
        })
    },
    []
  )

  useEffect(
    () => {
      fetch(`http://localhost:8080/furnitures`)
        .then(response => response.json())
        .then((furnituresArray) => {
          setFurnitures(furnituresArray)
        })
    },
    []
  )

  useEffect(
    () => {
      fetch(`http://localhost:8080/lights`)
        .then(response => response.json())
        .then((lightsArray) => {
          setLights(lightsArray)
        })
    },
    []
  )


  
  const backdropRename = () => {
    let options = []
    for (const backdrop of backdrops) {
      backdrop.label = backdrop.name
      backdrop.value = backdrop.id
      options.push(backdrop)
    }
    setBackdropChoices(options)
  }
  
  useEffect(
    () => {
      backdropRename()
    }, [backdrops]
  )

  
  const propRename = () => {
    let options = []
    for (const prop of props) {
      prop.label = prop.name
      prop.value = prop.id
      options.push(prop)
    }
    setPropChoices(options)
  }
  
  useEffect(
    () => {
      propRename()
    },
    [props]
  )

  const furnitureRename = () => {
    let options = []
    for (const furniture of furnitures) {
      furniture.label = furniture.name
      furniture.value = furniture.id
      options.push(furniture)
    }
    setFurnitureChoices(options)
  }
  
  useEffect(
    () => {
      furnitureRename()
    },
    [furnitures]
  )

  
  const lightRename = () => {
    let options = []
    for (const light of lights) {
      light.label = light.name
      light.value = light.id
      options.push(light)
    }
    setLightChoices(options)
  }
  
  useEffect(
    () => {
      lightRename()
    },
    [lights]
  )
  //     // return (
  //     // );
  //   const lights = [
  //     {
  //       id: 0,
  //       value: 0,
  //       name: "none",
  //       label: "none"

  //     },
  //     {
  //       id: 1,
  //       value: 1,
  //       name: "camera lights",
  //       label: "camera lights"

  //     },
  //     {
  //       id: 2,
  //       value: 2,
  //       name: "LED's",
  //       label: "LED's"
  //     },
  // ]










  const data = [
    {
      value: 1,
      label: "cerulean"
    },
    {
      value: 2,
      label: "fuchsia rose"
    },
    {
      value: 3,
      label: "true red"
    },
    {
      value: 4,
      label: "aqua sky"
    },
    {
      value: 5,
      label: "tigerlily"
    },
    {
      value: 6,
      label: "blue turquoise"
    }
  ]












  return (
    <>
      <h2>MULTISELECT MOFO</h2>
      {/* <div className="App">
          <Select
            defaultValue={[lights[1], lights[2]]}
            isMulti
            name="lights"
            options={lights}
            className="basic-multi-select"
            classNamePrefix="select"
          /> */}

      {/* <Select options={lights}
            /> */}
      <div>
        <Select
          isMulti
          placeholder="Please Select Backdrops"
          value={selectedBackdropOption}
          options={backdropChoices}
          onChange={handleBackdropChange}
        />

        {selectedBackdropOption && <div style={{ marginTop: 20, lineHeight: '25px' }}>
          {/* <b>Selected Options</b><br />
          <pre>{JSON.stringify(selectedLightOption.name)}</pre> */}
        </div>}
      </div>


      <div>
        <Select
          isMulti
          placeholder="Please Select Props"
          value={selectedPropOption}
          options={propChoices}
          onChange={handlePropChange}
        />

        {selectedPropOption && <div style={{ marginTop: 20, lineHeight: '25px' }}>
          {/* <b>Selected Options</b><br />
          <pre>{JSON.stringify(selectedLightOption.name)}</pre> */}
        </div>}
      </div>

      <div>
        <Select
          isMulti
          placeholder="Please Select Furniture"
          value={selectedFurnitureOption}
          options={furnitureChoices}
          onChange={handleFurnitureChange}
        />

        {selectedFurnitureOption && <div style={{ marginTop: 20, lineHeight: '25px' }}>
          {/* <b>Selected Options</b><br />
          <pre>{JSON.stringify(selectedLightOption.name)}</pre> */}
        </div>}
      </div>


      <div>
        <Select
          isMulti
          placeholder="Please Select Lights"
          value={selectedLightOption}
          options={lightChoices}
          onChange={handleLightChange}
        />

        {selectedLightOption && <div style={{ marginTop: 20, lineHeight: '25px' }}>
          {/* <b>Selected Options</b><br />
          <pre>{JSON.stringify(selectedLightOption.name)}</pre> */}
        </div>}
      </div>

      {/* <div className="App">


        <Select
          isMulti
          placeholder="Select Option"
          value={selectedOption} // set selected value
          options={data} // set list of the data
          onChange={handleChange} // assign onChange function
        />

        {selectedOption && <div style={{ marginTop: 20, lineHeight: '25px' }}>
          <b>Selected Options</b><br />
          <pre>{JSON.stringify(selectedOption, null, 2)}</pre>
        </div>}
      </div> */}
      {/* <select value={newRental.lightId}
            onChange={
                (event) => {
                    const copy = { ...newRental }
                    copy.lightId = parseInt(event.target.value)
                    updateRental(copy)
                }
            }>
            <option value="0">Please Select Lights</option>
            {lights.map((light) => {
                return <option key={light.id} value={light.id}> {light.name} {light.image} </option>
            })}
        </select> */}
      {/* </div> */}
    </>

  )

}