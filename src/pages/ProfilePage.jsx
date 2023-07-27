import { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Button, Container, Row, Col, Image, Form } from 'react-bootstrap';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                navigate('/login');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);


    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [username, setUsername] = useState('Ngaiti');
    const [briefDescription, setBriefDescription] = useState('');
    const [editingUsername, setEditingUsername] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);



    const fetchProfileImageUrl = async () => {
        try {
            //replace this with your actual firebase url
            const profileImageRef = ref(storage, `profile-pics/${username}.jpeg`);
            const downloadURL = await getDownloadURL(profileImageRef);
            setProfileImageUrl(downloadURL);
        } catch (error) {
            console.error('Error fetching profile image URL:', error);
        }
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            //replace this with your actual firebase url
            const profileImageRef = ref(storage, `profile-pics/${username}.jpeg`);
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

    useEffect(() => {
        fetchProfileImageUrl();
        setBriefDescription("Whatever.");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);



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