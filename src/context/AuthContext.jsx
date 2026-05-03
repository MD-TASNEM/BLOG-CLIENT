import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import apiClient from "../config/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          const response = await apiClient.get(`/users/profile/${user.uid}`);
          setUserProfile(response.data);
        } catch (error) {
          // If user doesn't exist in database, create profile
          if (error.response?.status === 404) {
            try {
              await apiClient.post("/users/create-user", {
                name: user.displayName || user.email.split("@")[0],
                email: user.email,
                photoURL: user.photoURL || "",
              });
              const profileResponse = await apiClient.get(
                `/users/profile/${user.uid}`,
              );
              setUserProfile(profileResponse.data);
            } catch (createError) {
              console.error("Error creating user profile:", createError);
            }
          } else {
            console.error("Error fetching user profile:", error);
          }
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const refreshUserProfile = async () => {
    if (currentUser) {
      try {
        const response = await apiClient.get(
          `/users/profile/${currentUser.uid}`,
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error refreshing user profile:", error);
      }
    }
  };

  const createUserProfile = async (userData) => {
    if (currentUser) {
      try {
        await apiClient.post("/users/create-user", {
          name:
            userData.name ||
            currentUser.displayName ||
            currentUser.email.split("@")[0],
          email: currentUser.email,
          photoURL: userData.photoURL || currentUser.photoURL || "",
        });
        await refreshUserProfile();
        return true;
      } catch (error) {
        console.error("Error creating user profile:", error);
        return false;
      }
    }
    return false;
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    setLoading,
    refreshUserProfile,
    createUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
