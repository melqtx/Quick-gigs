"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://alunvxkjhxxnldzxcnio.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsdW52eGtqaHh4bmxkenhjbmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0Mzg2ODQsImV4cCI6MjA0NTAxNDY4NH0.7IDyHfwzZkj99aePzOK42ImSHuieIiJDtoHLW1KjlkY";
const supabase = createClient(supabaseUrl, supabaseKey);

function CreateJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [earn, setEarn] = useState(20); // default minimum budget ₹20
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [category, setCategory] = useState("tech");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Constructing the full job data object
    const jobData = {
      title: title,
      discription: description, // Ensure this matches your DB schema
      price: earn, // Fix the field name from 'earn' to 'price' as per your table structure
      skills: skills,
      location: location,
    };

    try {
      const { data, error } = await supabase
        .from("jobs")
        .insert([jobData]) // Insert all fields in a single object
        .select(); // Selecting after insert to confirm

      if (error) throw error;

      console.log("Job created:", data);
      setError(null); // Reset error if successful

      // Optionally, reset the form fields after successful submission
      setTitle("");
      setDescription("");
      setEarn(20);
      setTime("");
      setLocation("");
      setSkills("");
      setCategory("tech");
    } catch (error) {
      setError("Error creating job. Please try again." + error);
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-10" style={{marginTop:""}}>
      <div className="bg-gray-850 p-8 rounded-lg shadow-xl w-full max-w-4xl border border-blue-500">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Quick Gigs</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {error && <p className="text-red-500 text-center col-span-2">{error}</p>}

          <div className="col-span-1">
            <label className="block mb-2 text-sm font-medium">Task Name</label>
            <input
              type="text"
              value={title} // Bind the value to the state
              onChange={(e) => setTitle(e.target.value)} // Update the state on change
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter task name"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Describe the job in detail"
              rows={4}
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm font-medium">Time (e.g., 2 days, 1 week)</label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter time frame"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm font-medium">Payment (min ₹20)</label>
            <input
              type="number"
              value={earn}
              onChange={(e) => setEarn(Math.max(20, Number(e.target.value)))}
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter payment amount"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm font-medium">Location</label>
            <input
              type="text"
              placeholder="Where ?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 mb-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm font-medium">Skills (comma separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter required skills"
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="tech">Tech</option>
              <option value="non-tech">Non-Tech</option>
            </select>
          </div>

          
        </form>
        <div className="flex justify-evenly mt-5">

          <button
            type="submit"
            className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg w-96 transition duration-300"
            onClick={handleSubmit}
            >
            Create Job
          </button>
          <button
            className="col-span-2 bg-red-600 hover:bg-blue-700 text-white py-3 rounded-lg w-96 transition duration-300"
            >
            Add Payment
          </button>
            </div>
      </div>
    </div>
  );
}

export default CreateJobPage;
