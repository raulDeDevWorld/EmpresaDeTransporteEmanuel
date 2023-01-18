import React, { useState, useMemo, useContext} from 'react'

const UserContext = React.createContext()

export function UserProvider ({ children }) {

	const [user, setUser] = useState(undefined)
	const [userDB, setUserDB] = useState('')
	const [specificData, setSpecificData] = useState(null)
	const [specificDataEditable, setSpecificDataEditable] = useState(null)
	const [success, setSuccess] = useState(null)


	function setUserProfile (userProfile) {
		setUser(userProfile)
	}
	function setUserData (userDatabase) {
		setUserDB(userDatabase)
	}
	function setUserSpecificData (userSpecificData) {
		setSpecificData(userSpecificData)
	}
	function setUserSpecificDataEditable (userSpecificDataEditable) {
		setSpecificDataEditable(userSpecificDataEditable)
	}
	function setUserSuccess (mode) {
		setSuccess(mode)
		setTimeout(()=>{ setSuccess(null)}, 4000)
	}

	const value = useMemo(()=>{
		return ({
			user,
			userDB,
			specificData,
			specificDataEditable,
			success,
			setUserProfile,
			setUserData,
			setUserSpecificData,
			setUserSpecificDataEditable,
			setUserSuccess,
		})
	}, [ user, userDB, success, specificData, specificDataEditable ])

	return (
		<UserContext.Provider value={value} >
			{ children }
		</UserContext.Provider>
	)
} 

export function useUser () {
	const context = useContext(UserContext)
	if(!context){
		throw new Error('error')
	}
	return context
}