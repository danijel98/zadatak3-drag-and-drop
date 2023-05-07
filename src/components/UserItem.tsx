import style from './dragAndDrop.module.css'

export type UserProps = {
  name: string;
  email: string;
};

const UserItem = ({ name, email }: UserProps) => {
  return (
    <div className={style.containerUserItem}>
      <p>{name} {email}</p>
    </div>
  );
};

export default UserItem;
