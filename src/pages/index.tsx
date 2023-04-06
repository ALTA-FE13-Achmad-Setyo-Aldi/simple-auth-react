import { Component } from "react";
import axios from "axios";

import { Spinner } from "../components/Loading";
import Layout from "../components/Layout"; // default import
import Card from "../components/Card";
import { UserType } from "../utils/types/user"; // named import

interface PropsType {}

interface StateType {
  datas: UserType[];
  loading: boolean;
}

class Home extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      datas: [],
      loading: true,
    };
  }

  componentDidMount(): void {
    this.fetchData();
  }

  fetchData() {
    axios
      .get("users")
      .then((response) => {
        const { data } = response.data;
        this.setState({ datas: data });
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally(() => this.setState({ loading: false }));
  }

  fetchAlternative() {
    fetch(
      "https://virtserver.swaggerhub.com/devanada/hells-kitchen/1.1.0/users"
    )
      .then((result) => result.json())
      .then((response) => {
        const { data } = response;
        this.setState({ datas: data });
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <Layout>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {this.state.loading ? (
            <Spinner />
          ) : (
            this.state.datas.map((data, index) => {
              return (
                <Card
                  key={data.id}
                  first_name={data.first_name}
                  last_name={data.last_name}
                  username={data.username}
                  image={data.image}
                />
              );
            })
          )}
        </div>
      </Layout>
    );
  }
}

export default Home;
