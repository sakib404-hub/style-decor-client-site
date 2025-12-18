import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import Spinner from '../../../Components/Spinner/Spinner';
import Swal from 'sweetalert2';
import { FaRegUser } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';

const ManageUsers = () => {
    const axiosInstanceSecure = useAxiosSecure();
    const [selectedUser, setSelectedUser] = useState(null);
    const modalRef = useRef(null);
    const [searchText, setSearchText] = useState('');

    // loading the user informations  
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['/users', 'allUsers', searchText],
        queryFn: async () => {
            const res = await axiosInstanceSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    })

    const updateUserRole = (user, role) => {
        const updateInfo = {
            userRole: role
        }
        axiosInstanceSecure.patch(`/users/${user?._id}/role`, updateInfo)
            .then((res) => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        title: `${user.userName} is now a ${role}!`,
                        icon: 'success',
                        confirmButtonColor: '#4ade80',
                        timer: 2000,
                        timerProgressBar: true,
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Oops! Something went wrong',
                    text: error?.response?.data?.message || 'Unable to update the role. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#f87171',
                    showCancelButton: true,
                    cancelButtonText: 'Close',
                    confirmButtonText: 'Retry',
                });
            })
    }

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: `Promote ${user.userName}?`,
            text: "This user will become an Admin. You can revert the role later if needed.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, make Admin",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#4ade80",
            cancelButtonColor: "#f87171",
            customClass: {
                popup: 'rounded-xl shadow-lg p-6',
                title: 'text-lg font-semibold text-gray-800',
                htmlContainer: 'text-gray-600 mt-2',
                confirmButton: 'px-6 py-2 text-white font-semibold',
                cancelButton: 'px-6 py-2 font-semibold'
            },
            focusConfirm: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const role = 'admin'
                updateUserRole(user, role);
            }
        });
    }

    const handleMadeDecorator = (user) => {
        Swal.fire({
            title: `Promote ${user.userName}?`,
            text: "This user will become a Decorator. You can revert the role later if needed.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, make Decorator",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#fbbf24", // amber for decorator
            cancelButtonColor: "#f87171",
            customClass: {
                popup: 'rounded-xl shadow-lg p-6',
                title: 'text-lg font-semibold text-gray-800',
                htmlContainer: 'text-gray-600 mt-2',
                confirmButton: 'px-6 py-2 font-semibold text-white',
                cancelButton: 'px-6 py-2 font-semibold'
            },
            focusConfirm: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const role = 'decorator';
                updateUserRole(user, role);
            }
        });
    }
    const handleRemoveFromAdmin = (user) => {
        Swal.fire({
            title: `Demote ${user.userName}?`,
            text: "This user will no longer be an Admin. You can promote them again later if needed.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, demote",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#fbbf24",
            cancelButtonColor: "#f87171",
            customClass: {
                popup: 'rounded-xl shadow-lg p-6',
                title: 'text-lg font-semibold text-gray-800',
                htmlContainer: 'text-gray-600 mt-2',
                confirmButton: 'px-6 py-2 font-semibold text-white',
                cancelButton: 'px-6 py-2 font-semibold'
            },
            focusConfirm: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const role = 'user';
                updateUserRole(user, role)
            }
        });
    };

    const handleView = (user) => {
        setSelectedUser(user);
        modalRef.current.showModal();
    }

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="rounded-xl my-10 p-4 shadow-md">
                    <div className="flex items-center space-x-2">
                        <label className="flex items-center bg-white border border-gray-300 rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
                            <FaRegUser className="text-gray-400 mr-2" />
                            <input
                                type="email"
                                placeholder="Search User"
                                className="outline-none md:w-64"
                                onChange={(event) => setSearchText(event.target.value)}
                            />
                        </label>
                        <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl px-6 py-2 shadow-md transition-all duration-200">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div className="bg-white rounded-2xl shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Head */}
                            <thead className="bg-indigo-100 text-indigo-700">
                                <tr>
                                    <th className="whitespace-nowrap">SL</th>
                                    <th>User</th>
                                    <th className="hidden lg:table-cell">Email</th>
                                    <th>Role</th>
                                    <th className="hidden md:table-cell">Joined</th>
                                    <th className="text-center whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id} className="hover">
                                        {/* SL */}
                                        <td>{index + 1}</td>

                                        {/* User */}
                                        <td>
                                            <div className="flex items-center gap-3 min-w-[220px]">
                                                <div className="avatar">
                                                    <div className="w-10 h-10 rounded-full ring ring-indigo-300">
                                                        <img
                                                            src={user.userImage || "/defaultUser.png"}
                                                            alt={user.userName}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="font-semibold">{user.userName}</p>
                                                    <p className="text-sm text-gray-500 lg:hidden">
                                                        {user.userEmail}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td className="hidden lg:table-cell">
                                            {user.userEmail}
                                        </td>

                                        {/* Role */}
                                        <td>
                                            <span
                                                className={`badge capitalize ${user.userRole === "admin"
                                                    ? "badge-success"
                                                    : user.userRole === "decorator"
                                                        ? "badge-warning"
                                                        : "badge-info"
                                                    }`}
                                            >
                                                {user.userRole}
                                            </span>
                                        </td>

                                        {/* Joined */}
                                        <td className="hidden md:table-cell">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>

                                        {/* Actions */}
                                        <td>
                                            <div className="flex gap-2 justify-center min-w-[220px]">
                                                <button
                                                    onClick={() => handleView(user)}
                                                    className="btn btn-xs md:btn-sm btn-outline btn-info"
                                                >
                                                    View
                                                </button>

                                                <button
                                                    onClick={() => handleMadeDecorator(user)}
                                                    className={`btn btn-xs md:btn-sm btn-outline btn-warning ${user.userRole === "decorator" ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    disabled={user.userRole === "decorator"}
                                                >
                                                    Decorator
                                                </button>
                                                {
                                                    (user.userRole === 'user' || user.userRole === 'decorator') && (
                                                        <button
                                                            onClick={() => handleMakeAdmin(user)}
                                                            className="btn btn-xs md:btn-sm btn-outline btn-success"
                                                        >
                                                            Admin
                                                        </button>
                                                    )
                                                }
                                                {
                                                    user.userRole === 'admin' && <button
                                                        onClick={() => handleRemoveFromAdmin(user)}
                                                        className={`btn btn-xs md:btn-sm btn-outline btn-success`}
                                                    >
                                                        Remove From Admin
                                                    </button>

                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    {
                        isLoading && <Spinner></Spinner>
                    }
                </div>

                {/* /Modal For displaying user information   */}
                <dialog id="user_modal" className="modal" ref={modalRef}>
                    <div className="modal-box max-w-md">
                        {selectedUser ? (
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="avatar">
                                    <div className="w-24 h-24 rounded-full ring ring-indigo-300 overflow-hidden">
                                        <img
                                            src={selectedUser.userImage || "/defaultUser.png"}
                                            alt={selectedUser.userName}
                                        />
                                    </div>
                                </div>

                                <h3 className="font-bold text-xl">{selectedUser.userName}</h3>

                                <p><strong>Email:</strong> {selectedUser.userEmail}</p>
                                <p><strong>Role:</strong> {selectedUser.userRole}</p>
                                <p><strong>Joined:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>

                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </dialog>

            </div>
        </div>
    );
};

export default ManageUsers;