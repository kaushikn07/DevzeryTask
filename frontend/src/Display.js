import React, { useState, useEffect } from "react";
function Display(){
    const [allProfiles, setAllProfiles] = useState([]);
    useEffect(() => {
        // Fetch all profiles
        fetch('http://localhost:3000/display')  // Replace with your actual endpoint
          .then(response => response.json())
          .then(data => setAllProfiles(data.profiles))
          .catch(error => console.error('Error fetching all profiles:', error));
      }, []);
    return(
      <div>
        <h3>All Profiles</h3>
        <div>
            <ul>
            {allProfiles.map(profile => (
            <li >{profile.username}</li>
            ))}
            </ul>
        </div>
    </div>
    );
};

export default Display;