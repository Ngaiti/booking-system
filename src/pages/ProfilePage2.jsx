import { useState, useEffect, useContext } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Button, Container, Row, Col, Image, Form } from 'react-bootstrap';
import { auth } from '../firebase';
import { AuthContext } from '../components/AuthProvider'; // Import your AuthContext
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const authContext = useContext(AuthContext); // Use the AuthContext
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [username, setUsername] = useState('');
    const [briefDescription, setBriefDescription] = useState('');
    const [editingUsername, setEditingUsername] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setUsername(user.displayName || ''); // Set the username from user's display name
                fetchProfileImageUrl();
                fetchUserData(user.uid); // Pass the UID to the function
            } else {
                navigate('/login');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);

    const fetchProfileImageUrl = async () => {
        try {
            if (authContext.currentUser) {
                const profileImageRef = ref(storage, `profile-pics/${authContext.currentUser.uid}.jpeg`);
                const downloadURL = await getDownloadURL(profileImageRef);
                setProfileImageUrl(downloadURL);
            }
        } catch (error) {
            console.error('Error fetching profile image URL:', error);
        }
    }

    const fetchUserData = (userId) => {
        axios
            .get(`https://capstone-project.ngaiti.repl.co/users/${userId}`)
            .then((response) => {
                const userData = response.data;
                setUsername(userData.username);
                setBriefDescription(userData.email); // Assuming the API response includes an 'email' field
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    };


    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const profileImageRef = ref(storage, `profile-pics/${user.uid}.jpeg`);
            uploadBytes(profileImageRef, file).then(() => {
                fetchProfileImageUrl();
            }).catch((error) => {
                console.error('Error uploading profile picture:', error);
            });
        }
    };

    const handleUsernameEdit = () => {
        setEditingUsername(true);
    };

    const handleDescriptionEdit = () => {
        setEditingDescription(true);
    };

    const handleSaveUsername = () => {
        setEditingUsername(false);
    };

    const handleSaveDescription = () => {
        setEditingDescription(false);
    };

    return (
        <Container className="my-4">
            <h1 className="text-center">Profile Page</h1>
            <Row className="justify-content-center">
                <Col xs={12} sm={6} className="text-center">
                    <Image src={profileImageUrl} alt="Profile" roundedCircle style={{ width: '300px', height: '300px' }} />
                    <div>
                        {editingUsername ? (
                            <div>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mb-2"
                                />
                                <Button variant="outline-primary" onClick={handleSaveUsername}>Save</Button>
                            </div>
                        ) : (
                            <div>
                                <h2>{username}</h2>
                                <Button variant="outline-dark" onClick={handleUsernameEdit} className="mb-2">Edit Username</Button>
                            </div>
                        )}
                    </div>
                    <div>
                        {editingDescription ? (
                            <div>
                                <Form.Control
                                    as="textarea"
                                    value={briefDescription}
                                    onChange={(e) => setBriefDescription(e.target.value)}
                                    rows={4}
                                    className="mb-2"
                                />
                                <Button variant="outline-primary" onClick={handleSaveDescription}>Save</Button>
                            </div>
                        ) : (
                            <div>
                                <p>{briefDescription}</p>
                                <Button variant="outline-dark" onClick={handleDescriptionEdit} className="mb-2">Edit Description</Button>
                            </div>
                        )}
                    </div>
                    <div>
                        <Form.Control type="file" accept="image/*" onChange={handleProfilePictureChange} className="my-3" />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;