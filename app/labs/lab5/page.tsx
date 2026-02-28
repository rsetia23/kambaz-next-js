import EnvironmentVariables from "./EnvironmentVariables";
import HttpClient from "./HttpClient";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <div className="list-group">
        <a href={`${HTTP_SERVER}/lab5/welcome`} className="list-group-item">
          Welcome
        </a>
      </div>
      <hr />
      <EnvironmentVariables />
      <HttpClient />
      <PathParameters />
      <QueryParameters />
      <WorkingWithObjects />
      <WorkingWithObjectsAsynchronously />
      <WorkingWithArrays />
      <WorkingWithArraysAsynchronously />
    </div>
  );
}
