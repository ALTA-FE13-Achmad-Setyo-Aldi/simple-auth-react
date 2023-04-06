import { Link } from "react-router-dom";
import { FC } from "react";

interface Props {
  image: string;
  username: string;
  first_name: string;
  last_name: string;
}

const Card: FC<Props> = (props) => {
  const { image, username, first_name, last_name } = props;

  return (
    <div className="flex flex-col items-center">
      <img
        src={image}
        alt={`${username}'s picture`}
        className="rounded-full w-28 aspect-square"
      />
      <Link className="font-bold tracking-wider" to={`profile/${username}`}>
        {first_name} {last_name}
      </Link>
      <p className="text-sm">{username}</p>
    </div>
  );
};

export default Card;
