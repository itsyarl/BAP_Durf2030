import React from "react";
import Project from "../../../models/Project";
import { useState } from "react";
import { useStores } from "../../../hooks/useStores";
import style from "./AddProject.module.css"


const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [donationGoal, setDonationGoal] = useState("");
  const [theme, setTheme] = useState("");
  const [eventDate, setEventDate] = useState("");

  const { projectStore } = useStores();

  const handleSubmit = async e => {
    e.preventDefault();

    const url = `https://api.cloudinary.com/v1_1/dgbx78idf/upload`
    const formData = new FormData();
    const imageForm = document.getElementById(`image`).files[0];
    formData.append('file', imageForm);
    formData.append('upload_preset', "nouoxmyc");

    const response = await fetch(url, {
      method: "post",
      body: formData,
    });

    const image = await response.json();
    console.log(image);

    const p = new Project({ title, description, store: projectStore, theme, eventDate, donationGoal, location, image });
    try {
      const newProject = await projectStore.createProject(p);
      console.log(newProject);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={style.test}>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Title</span>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </label>

          <label>
            <span>Project omschrijving</span>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>

          <label>
            <span>Adres</span>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </label>

          <label>
            <span>Donatie goal</span>
            <input
              type="text"
              value={donationGoal}
              onChange={e => setDonationGoal(e.target.value)}
            />
          </label>

          <label>
            <span>Thema</span>
            <input
              type="text"
              value={theme}
              onChange={e => setTheme(e.target.value)}
            />
          </label>

          <label>
            <span>Deadline project</span>
            <input
              type="text"
              value={eventDate}
              onChange={e => setEventDate(e.target.value)}
            />
          </label>
          
          <input type="file" id="image" />

          <input type="submit" value="Add project" />
        </form>
      </div>
    </>
  );
};

export default AddProject;
