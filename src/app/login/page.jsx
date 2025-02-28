"use client";

import React, { useState, useEffect } from 'react';
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            router.replace('/welcome');
        }
    }, [session, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", { email, password, redirect: false });

            if (res.error) {
                setError("Invalid credentials");
                return;
            }

            router.replace("/welcome");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Navbar />
            <div className="flex-grow">
                <div className="flex justify-center items-center">
                    <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl">
                        <h3 className="text-3xl">Login Page</h3>
                        <hr className="my-3" />
                        {error && <p className="text-red-500">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                                placeholder="Enter your email"
                            />
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                                placeholder="Enter your password"
                            />
                            <button
                                type="submit"
                                className="bg-[#73C088] text-white py-2 px-4 rounded-md hover:bg-[#459866] transition-colors duration-300'"
                            >
                                Sign In
                            </button>
                        </form>
                        <hr className="my-3" />
                        <p>
                            Go to{" "}
                            <Link href="/register" className="text-blue-500 hover:underline">
                                Register
                            </Link>{" "}
                            Page
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    );
}

export default LoginPage;
