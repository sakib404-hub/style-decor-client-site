import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../Hooks/useAxios/useAxios';
import Spinner from '../../../Components/Spinner/Spinner';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosInstance = useAxios();

    // loading the user informations  
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['/users', 'allUsers'],
        queryFn: async () => {
            const res = await axiosInstance.get('/users');
            return res.data;
        }
    })

    const updateUserRole = (user, role) => {
        const updateInfo = {
            userRole: role
        }
        axiosInstance.patch(`/users/${user?._id}/role`, updateInfo)
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
    return (
        <div>
            <div>
                {
                    isLoading && <Spinner></Spinner>
                }
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
                                                    onClick={() => console.log(user.userRole)}
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

            </div>
        </div>
    );
};

export default ManageUsers;