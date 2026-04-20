import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectUpdateUserError, selectUser } from '@selectors';
import { updateUser } from '../../services/slices';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser) || { name: '', email: '' };
  const profileUpdateError = useSelector(selectUpdateUserError) || undefined;

  const [profileForm, setProfileForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    password: ''
  });

  useEffect(() => {
    setProfileForm((prevForm) => ({
      ...prevForm,
      name: currentUser?.name || '',
      email: currentUser?.email || ''
    }));
  }, [currentUser]);

  const isFormChanged =
    profileForm.name !== currentUser?.name ||
    profileForm.email !== currentUser?.email ||
    !!profileForm.password;

  const handleProfileSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(
      updateUser({
        name: profileForm.name,
        email: profileForm.email,
        ...(profileForm.password ? { password: profileForm.password } : {})
      })
    );
    setProfileForm((prevForm) => ({
      ...prevForm,
      password: ''
    }));
  };

  const handleProfileCancel = (event: SyntheticEvent) => {
    event.preventDefault();
    setProfileForm({
      name: currentUser.name,
      email: currentUser.email,
      password: ''
    });
  };

  const handleProfileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfileForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={profileForm}
      isFormChanged={isFormChanged}
      updateUserError={profileUpdateError}
      handleCancel={handleProfileCancel}
      handleSubmit={handleProfileSubmit}
      handleInputChange={handleProfileInputChange}
    />
  );
};
