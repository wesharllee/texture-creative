import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//send page
export const LightsPage = () => {
  //get current user based on login
  const localTextureUser = localStorage.getItem("texture_user")
  const textureUserObject = JSON.parse(localTextureUser)
  //function to navigate to other pages
  const Navigate = useNavigate()

  //create setter function to call variables from my json database w/ use state for each 
  //option class users can choose from
  const [backdrops, setBackdrops] = useState([])
  const [props, setProps] = useState([])
  const [furnitures, setFurnitures] = useState([])
  const [lights, setLights] = useState([])

  //create setter functions to copy initial user options and add label and value to state for multi-select
  const [backdropChoices, setBackdropChoices] = useState([])
  const [propChoices, setPropChoices] = useState([])
  const [furnitureChoices, setFurnitureChoices] = useState([])
  const [lightChoices, setLightChoices] = useState([])

  //create setter functions to send chosen options to state
  const [selectedBackdropOptions, setSelectedBackdropOption] = useState([])
  const [selectedPropOptions, setSelectedPropOption] = useState([])
  const [selectedFurnitureOptions, setSelectedFurnitureOption] = useState([])
  const [selectedLightOptions, setSelectedLightOption] = useState([])


  //when multiple-dropdown-option is selected create setter function for chosen option in state
  const handleBackdropChange = evt => {
    setSelectedBackdropOption(evt)
  }
  const handlePropChange = evt => {
    setSelectedPropOption(evt)
  }
  const handleFurnitureChange = evt => {
    setSelectedFurnitureOption(evt)
  }
  const handleLightChange = evt => {
    setSelectedLightOption(evt)
  }

  //create setter function to create a new object to send to my database
  //add initial state (date, startTime, endTime, totalHours)
  const [newBooking, updateBooking] = useState({
    date: "",
    startTime: "00:00",
    endTime: "00:00",
    totalHours: 0
  })



  //create button to push all chosen options
  const bookButtonClick = (event) => {
    event.preventDefault()


    //create functions to hold return fetch posts for all user option packages
    const createBackdropPackagePost = (backdropPackageObj) => {
      return fetch(`http://localhost:8080/backdroppackages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(backdropPackageObj)
      })
    }

    const createPropPackagePost = (propPackageObj) => {
      return fetch(`http://localhost:8080/proppackages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(propPackageObj)
      })
    }

    const createFurniturePackagePost = (furniturePackageObj) => {
      return fetch(`http://localhost:8080/furniturepackages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(furniturePackageObj)
      })
    }

    const createLightPackagePost = (lightPackageObj) => {
      return fetch(`http://localhost:8080/lightpackages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(lightPackageObj)
      })
    }

    //create fetch post to create bookingDate and get the bookingDateId
    return fetch(`http://localhost:8080/bookingDates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      //update newBooking from newBooking setter function in database
      body: JSON.stringify(newBooking)
    })
      //get my response from json for what was my bookingDate object
      .then(response => response.json())
      //create new variable with bookingDate objects information
      .then((newBookingObj) => {
        //create new rental package to send to state
        const RentalPackage = {
          //get user id from initial login information
          userId: textureUserObject.id,
          //get bookingDateId from my json response variable
          bookingDateId: newBookingObj.id,
          //create initial cost state
          totalCost: 0,
          //initial signature === false. They have not signed
          eSign: false
        }
        fetch(`http://localhost:8080/rentalPackages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          //update rentalPackage in database
          body: JSON.stringify(RentalPackage)
        })
          //get my response from json for what was my RentalPackage object
          .then(response => response.json())
          //create new variable with RentalPackage objects information
          .then((newRentalPackage) => {

            //create array to hold promises for promise.all function
            const promArray = []

            //iterate through each option of options
            for (const selectedBackdropOption of selectedBackdropOptions) {
              //create new object for optionPackage
              const backdropPackage = {
                //get rentalPackageId from json newRentalPackage variable Id
                rentalPackageId: newRentalPackage.id,
                //get backdropId from iterated option
                backdropId: selectedBackdropOption.id
              }
              //create new variable to hold fetch post function and pass new optionPackage object
              const backdropPost = createBackdropPackagePost(backdropPackage)
              //push to promise array
              promArray.push(backdropPost)
            }

            for (const selectedPropOption of selectedPropOptions) {
              const propPackage = {
                rentalPackageId: newRentalPackage.id,
                propId: selectedPropOption.id
              }
              const propPost = createPropPackagePost(propPackage)
              promArray.push(propPost)
            }

            for (const selectedFurnitureOption of selectedFurnitureOptions) {
              const furniturePackage = {
                rentalPackageId: newRentalPackage.id,
                furnitureId: selectedFurnitureOption.id
              }
              const furniturePost = createFurniturePackagePost(furniturePackage)
              promArray.push(furniturePost)
            }

            for (const selectedLightOption of selectedLightOptions) {
              const lightPackage = {
                rentalPackageId: newRentalPackage.id,
                lightId: selectedLightOption.id
              }
              const lightPost = createLightPackagePost(lightPackage)
              promArray.push(lightPost)
            }

            //create a promise.all function and pass promise array through it
            Promise.all(promArray)
              //call back function containing Navigate (useNavigate())
              .then(() => {
                //navigate to the checkout page for current rental package
                Navigate(`/checkout/${newRentalPackage.id}`)
              })
          })
      })
  }

  //get options from json using setter functions at top of page
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


  //in order to use multi choice dropdown menu we need id === value and name === label
  //create functions to achieve this and push into a setter function
  const backdropRename = () => {
    let options = []
    for (const backdrop of backdrops) {
      backdrop.label = backdrop.name
      backdrop.value = backdrop.id
      options.push(backdrop)
    }
    setBackdropChoices(options)
  }
  //useEffect function to watch for initial option variable and utilize created rename function
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

  //function to subtract startTime from endTime
  const minus = (startHour, endHour) => {
    let result = endHour - startHour
    return result
  }


  return (
    <form>

      <h2>MULTISELECT MOFO</h2>

      <fieldset>
        <div>
          <Select
            isMulti
            placeholder="Please Select Backdrops"
            //capture selected option
            value={selectedBackdropOptions}
            //use the variable option that has been copied w/ added value and label
            options={backdropChoices}
            //onChange create a function to call setter function for selected option
            onChange={handleBackdropChange}
          />
          {/* display selected option inside of multi-select dropdown menu */}
          {selectedBackdropOptions && <div style={{ marginTop: 20, lineHeight: '25px' }}>
          </div>}
        </div>
      </fieldset>

      <fieldset>
        <div>
          <Select
            isMulti
            placeholder="Please Select Props"
            value={selectedPropOptions}
            options={propChoices}
            onChange={handlePropChange}
          />

          {selectedPropOptions && <div style={{ marginTop: 20, lineHeight: '25px' }}>
          </div>}
        </div>
      </fieldset>

      <fieldset>
        <div>
          <Select
            isMulti
            placeholder="Please Select Furniture"
            value={selectedFurnitureOptions}
            options={furnitureChoices}
            onChange={handleFurnitureChange}
          />

          {selectedFurnitureOptions && <div style={{ marginTop: 20, lineHeight: '25px' }}>
          </div>}
        </div>
      </fieldset>

      <fieldset>
        <div>
          <Select
            isMulti
            placeholder="Please Select Lights"
            value={selectedLightOptions}
            options={lightChoices}
            onChange={handleLightChange}
          />

          {selectedLightOptions && <div style={{ marginTop: 20, lineHeight: '25px' }}>
          </div>}
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="book__date">Book Date:</label>
          <input
            required autoFocus
            type="date"
            className="form-control"
            value={newBooking.date}
            onChange={
              (evt) => {
                const copy = { ...newBooking }
                copy.date = evt.target.value
                updateBooking(copy)
              }
            } />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="book__startTime">Start Time:</label>
          <input
            required autoFocus
            type="time"
            className="form-control"
            value={newBooking.startTime}
            onChange={
              (evt) => {
                const copy = { ...newBooking }
                copy.startTime = evt.target.value
                updateBooking(copy)
              }
            } />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="book__endTime">End Time:</label>
          <input
            required autoFocus
            type="time"
            className="form-control"
            value={newBooking.endTime}
            onChange={
              (evt) => {
                const copy = { ...newBooking }
                copy.endTime = evt.target.value
                copy.totalHours = minus(parseFloat(copy.startTime, 2), parseFloat(copy.endTime, 2))
                updateBooking(copy)
              }
            } />
        </div>
      </fieldset>
      
      {/* call back button click function inside of displayed button */}
      <button
        onClick={(clickEvent) => bookButtonClick(clickEvent)}
        className="btn btn-primary">
        Book Your Session
      </button>
    </form>
  )

}