import React, { Component } from "react";

interface Props {
  image: string;
  username: string;
  first_name: string;
  last_name: string;
}

class Card extends Component<Props> {
  render() {
    const { image, username, first_name, last_name } = this.props;
    /*
    const image = this.props.image
    const username = this.props.username
    const first_name = this.props.first_name
    const last_name = this.props.last_name
    */

    return (
      <div className="flex flex-col items-center">
        <img
          src={image}
          alt={`${username}'s picture`}
          className="rounded-full w-28 aspect-square"
        />
        <p className="font-bold tracking-wider">
          {first_name} {last_name}
        </p>
        <p className="text-sm">{username}</p>
      </div>
    );
  }
}

export default Card;
