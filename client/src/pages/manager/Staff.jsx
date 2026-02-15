import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createUserByManagerThunk,
  fetchUsersByBranchManagerThunk,
  updateUserByManagerThunk,
  deleteUserByManagerThunk,
} from "../../redux/features/user/user.thunk";
import { CreateStaffModal } from "../../components/manager/CreateStaffModal";
import { toast } from "react-hot-toast";

const Staff = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [showModal, setShowModal] = React.useState(false);
  const [editUser, setEditUser] = React.useState(null);

  useEffect(() => {
    dispatch(fetchUsersByBranchManagerThunk());
  }, [dispatch]);

  const handleCreateStaff = (staffData, id) => {
    if (id) {
      // EDIT MODE
      dispatch(updateUserByManagerThunk({ id, data: staffData }))
        .unwrap()
        .then((data) => {
          toast.success(data.message || "Staff updated");
          setShowModal(false);
          setEditUser(null);
          dispatch(fetchUsersByBranchManagerThunk());
        })
        .catch((error) => toast.error(error.message));
    } else {
      // CREATE MODE
      dispatch(createUserByManagerThunk(staffData))
        .unwrap()
        .then((data) => {
          toast.success(data.message || "Staff created");
          setShowModal(false);
          dispatch(fetchUsersByBranchManagerThunk());
        })
        .catch((error) => toast.error(error.message));
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this staff member?")) return;

    dispatch(deleteUserByManagerThunk(id))
      .unwrap()
      .then((data) => {
        toast.success(data.message || "Deleted");
        dispatch(fetchUsersByBranchManagerThunk());
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Staff Management</h2>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Staff Member
      </button>
      {loading && <p>Loading staff...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {users && users.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Staff Members</h3>
          <ul className="space-y-3 mt-4">
            {users.map((user) => (
              <li
                key={user._id}
                className="flex items-center justify-between border rounded-lg p-3 shadow-sm"
              >
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditUser(user);
                      setShowModal(true);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showModal && (
        <CreateStaffModal
          onClose={() => {
            setShowModal(false);
            setEditUser(null);
          }}
          onCreate={handleCreateStaff}
          editData={editUser}
        />
      )}
    </div>
  );
};

export default Staff;
