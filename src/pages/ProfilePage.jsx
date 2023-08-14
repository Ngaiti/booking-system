import { useState, useEffect, useContext } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Container, Row, Col, Image, Form } from 'react-bootstrap';
import { AuthContext } from '../components/AuthProvider';
import axios from 'axios';

const ProfilePage = () => {
    const authContext = useContext(AuthContext);

    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [description, setDescription] = useState('');

    const fetchUserData = (userId) => {
        console.log('Fetching user data for user ID:', userId); // Log the user ID

        axios
            .get(`https://capstone-project.ngaiti.repl.co/users/${userId}`)
            .then((response) => {
                const userData = response.data.data;
                console.log('Fetched user data:', userData); // Log the fetched user data
                setUsername(userData.username);
                setUserEmail(userData.user_email);
                setDescription(userData.description);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    };

    const fetchProfileImageUrl = async () => {
        if (authContext.currentUser) {
            try {
                const profileImageRef = ref(storage, `profile-pics/${authContext.currentUser.uid}.jpeg`);
                const downloadURL = await getDownloadURL(profileImageRef);
                setProfileImageUrl(downloadURL);
            } catch (error) {
                console.error('Error fetching profile image URL:', error);
            }
        }
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file && authContext.currentUser) {
            const profileImageRef = ref(storage, `profile-pics/${authContext.currentUser.uid}.jpeg`);
            uploadBytes(profileImageRef, file)
                .then(() => {
                    fetchProfileImageUrl();
                })
                .catch((error) => {
                    console.error('Error uploading profile picture:', error);
                });
        }
    };

    useEffect(() => {
        if (authContext.currentUser) {
            fetchUserData(authContext.currentUser.uid);
            fetchProfileImageUrl();
        }
    }, [authContext.currentUser]);


    return (
        <Container className="my-4">
            <h1 className="text-center">Profile Page</h1>
            <Row className="justify-content-center">
                <Col xs={12} sm={6} className="text-center">
                    <Image
                        className='mb-4'
                        src={profileImageUrl}
                        alt="Profile"
                        roundedCircle
                        style={{ width: '300px', height: '300px' }}
                    />
                    <div>
                        <h3>Upload Profile Picture:</h3>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                            className="my-3"
                        />
                    </div>
                    <div>
                        <h3>Username:</h3>
                        <p>{username}</p>
                    </div>
                    <div>
                        <h3>Email:</h3>
                        <p>{userEmail}</p>
                    </div>
                    <div>
                        <h3>Description:</h3>
                        <p>{description}</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;