import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

import { fetchProjectUser } from "../../redux/actions/projectUserActions";
import { fetchProjects } from "../../redux/actions/projectsActions";

Chart.register(...registerables);

const Charts = ({ projects, projectUser, getProjectUser, getProjects }) => {
  useEffect(() => {
    getProjectUser();
    getProjects();
  }, []);

  const labels = [];
  const data = [];
  const backgroundColor = [];
  const hoverBackgroundColor = [];

  const userInProject = projectUser.data.map((item) => item.id_project);

  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const countOccurrences = (item) => {
    return userInProject
      ? userInProject.reduce(function (count, value) {
          return count + (value === item);
        }, 0)
      : 0;
  };

  projects.data.forEach((project) => {
    labels.push(project.name);
    data.push(countOccurrences(project.id));
    backgroundColor.push(getRandomColor());
    hoverBackgroundColor.push(getRandomColor());
  });

  const pieChartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor,
      },
    ],
  };

  return (
    <div style={{ maxWidth: "300px", margin: "10px", textAlign: "center" }}>
      <p>Number of people on projects</p>
      <Pie data={pieChartData} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  projects: state.projects,
  projectUser: state.projectUser,
});

const mapDispatchToProps = {
  getProjectUser: fetchProjectUser,
  getProjects: fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
