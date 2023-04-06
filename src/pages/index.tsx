import { Component } from "react";
import Layout from "../components/Layout"; // default import
import Card from "../components/Card";
import { Spinner } from "../components/Loading";
import { UserType } from "../utils/types/user"; // named import

interface PropsType {}

interface StateType {
  datas: UserType[];
  loading: boolean;
}

class Home extends Component<PropsType, StateType> {
  // Constructor start
  constructor(props: PropsType) {
    super(props);
    this.state = {
      // state: default value
      datas: [],
      loading: true,
    };
  }
  // Constructor end

  // side effect
  componentDidMount(): void {
    // jika dilakukan perubahan nilai dari sebuah state didalam side effect, maka akan dilakukan render ulang
    this.fetchData();
    this.fetchProfile();
  }

  fetchData() {
    let temp: UserType[] = [];
    for (let i = 1; i <= 12; i++) {
      const obj = {
        id: i,
        first_name: "John",
        last_name: "Doe",
        username: `john_doe${i}`,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      };
      temp.push(obj);
    }
    setTimeout(() => {
      // setState = updater, untuk merubah nilai dari sebuah state
      this.setState({
        datas: temp,
        loading: false,
      });
    }, 1000);
  }

  fetchProfile() {}
  render() {
    return (
      <Layout>
        {" "}
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {this.state.loading ? (
            <Spinner />
          ) : (
            this.state.datas.map((data, index) => {
              return (
                <Card
                  key={data.id} // <~~ wajib ada sebagai pengenal satu sama lain
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
