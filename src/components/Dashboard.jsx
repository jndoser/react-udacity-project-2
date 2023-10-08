import { connect } from "react-redux";
import Card from "./Card";
import { useState } from "react";

const Dashboard = ({ authedUser, questions, users }) => {
  const [currentTab, setCurrentTab] = useState("new-questions-tab");

  const unanswered = (question) =>
    !question.optionOne.votes.includes(authedUser.id) &&
    !question.optionTwo.votes.includes(authedUser.id);

  const answered = (question) =>
    question.optionOne.votes.includes(authedUser.id) ||
    question.optionTwo.votes.includes(authedUser.id);

  return (
    <div>
      <h1 className="text-3xl font-bold mt-9" data-testid="heading">
        Dashboard
      </h1>

      <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          class="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li class="mr-2" role="presentation">
            <button
              class="inline-block p-4 border-b-2 rounded-t-lg"
              id="new-questions-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              onClick={(e) => setCurrentTab("new-questions-tab")}
            >
              New Questions
            </button>
          </li>
          <li class="mr-2" role="presentation">
            <button
              class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="answered-question-tab"
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
              onClick={(e) => setCurrentTab("answered-question-tab")}
            >
              Done
            </button>
          </li>
        </ul>
      </div>
      <div id="myTabContent">
        <div
          className={`${
            currentTab === "new-questions-tab" ? "" : "hidden"
          } p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}
          id="new-questions-tab"
          role="tabpanel"
          aria-labelledby="new-questions-tab"
        >
          <ul className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {questions.filter(unanswered).map((question) => (
              <li key={question.id}>
                <Card question={question} author={users[question.author]} />
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`${
            currentTab === "answered-question-tab" ? "" : "hidden"
          } p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}
          id="answered-question-tab"
          role="tabpanel"
          aria-labelledby="answered-question-tab"
        >
          <h2 className="text-2xl font-bold mt-6">Done</h2>
          <ul className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {questions.filter(answered).map((question) => (
              <li key={question.id}>
                <Card question={question} author={users[question.author]} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Dashboard);
