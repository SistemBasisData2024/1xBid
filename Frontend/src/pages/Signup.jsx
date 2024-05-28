import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
        }
        try {
        const response = await axios.post('/auth/register', {
            username,
            email,
            fullname,
            password,
            date_of_birth: dateOfBirth,
            phone_number: phoneNumber
        });
        if (response.data.message === 'Registration successful') {
            setSuccess('Registration successful. Redirecting to login...');
            setTimeout(() => {
            navigate('/login');
            }, 2000);
        } else {
            setError(response.data.message);
        }
        } catch (err) {
        setError('An error occurred. Please try again.');
        }
    };

    return (
        <section className="bg-gray-100 min-h-screen flex items-center justify-center">
        <Card className="mx-auto max-w-md">
            <CardHeader>
            <CardTitle className="text-xl">Create an account</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
            </CardHeader>
            <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {error && <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>}
                {success && <div className="bg-green-100 text-green-600 p-2 rounded">{success}</div>}
                <div>
                <Label htmlFor="username">Username</Label>
                <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Your username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </div>
                <div>
                <Label htmlFor="email">Your email</Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div>
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                    type="text"
                    name="fullname"
                    id="fullname"
                    placeholder="Your full name"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                </div>
                <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    required
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
                </div>
                <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Your phone number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                </div>
                <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>
                <Button type="submit" className="w-full">
                Sign up
                </Button>
                <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                    Sign in
                </Link>
                </div>
            </form>
            </CardContent>
        </Card>
        </section>
    );
};

export default Register;
