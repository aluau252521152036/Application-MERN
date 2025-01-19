import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "/components/ui/dialog"
import { Trash, Edit, Plus, Minus, Check, X } from "lucide-react"

type Course = {
  id: number
  title: string
  description: string
}

type User = {
  username: string
  password: string
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [courses, setCourses] = useState<Course[]>([])
  const [newCourseTitle, setNewCourseTitle] = useState('')
  const [newCourseDescription, setNewCourseDescription] = useState('')
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [editingDescription, setEditingDescription] = useState('')
  const [showRegisterDialog, setShowRegisterDialog] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false)
  const [showEditCourseDialog, setShowEditCourseDialog] = useState(false)
  const [message, setMessage] = useState('')

  const handleRegister = () => {
    if (registerUsername && registerPassword) {
      setCurrentUser({ username: registerUsername, password: registerPassword })
      setMessage('Registration successful!')
      setShowRegisterDialog(false)
    } else {
      setMessage('Please fill in all fields.')
    }
  }

  const handleLogin = () => {
    if (loginUsername === currentUser?.username && loginPassword === currentUser?.password) {
      setMessage('Login successful!')
      setShowLoginDialog(false)
    } else {
      setMessage('Invalid credentials.')
    }
  }

  const addCourse = () => {
    if (newCourseTitle && newCourseDescription) {
      const newCourse: Course = {
        id: courses.length + 1,
        title: newCourseTitle,
        description: newCourseDescription,
      }
      setCourses([...courses, newCourse])
      setMessage('Course added successfully!')
      setShowAddCourseDialog(false)
      setNewCourseTitle('')
      setNewCourseDescription('')
    } else {
      setMessage('Please fill in all fields.')
    }
  }

  const editCourse = () => {
    if (editingCourse && editingTitle && editingDescription) {
      const updatedCourses = courses.map(course =>
        course.id === editingCourse.id ? { ...course, title: editingTitle, description: editingDescription } : course
      )
      setCourses(updatedCourses)
      setMessage('Course updated successfully!')
      setShowEditCourseDialog(false)
      setEditingCourse(null)
      setEditingTitle('')
      setEditingDescription('')
    } else {
      setMessage('Please fill in all fields.')
    }
  }

  const deleteCourse = (courseId: number) => {
    const updatedCourses = courses.filter(course => course.id !== courseId)
    setCourses(updatedCourses)
    setMessage('Course deleted successfully!')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Course Management App</h1>
          <nav>
            <ul className="flex space-x-4">
              {!currentUser ? (
                <>
                  <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Register</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Register</DialogTitle>
                        <DialogDescription>
                          Create a new account.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="register-username" className="text-right">
                            Username
                          </Label>
                          <Input id="register-username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="register-password" className="text-right">
                            Password
                          </Label>
                          <Input id="register-password" type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleRegister}>Register</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Login</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Login</DialogTitle>
                        <DialogDescription>
                          Enter your credentials to login.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="login-username" className="text-right">
                            Username
                          </Label>
                          <Input id="login-username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="login-password" className="text-right">
                            Password
                          </Label>
                          <Input id="login-password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleLogin}>Login</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <Button variant="outline" onClick={() => setCurrentUser(null)}>Logout</Button>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {message && <p className="mb-4 text-green-500">{message}</p>}
        {currentUser ? (
          <>
            <Dialog open={showAddCourseDialog} onOpenChange={setShowAddCourseDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="mb-4">
                  <Plus className="mr-2 h-4 w-4" /> Add Course
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Course</DialogTitle>
                  <DialogDescription>
                    Enter course details.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="course-title" className="text-right">
                      Title
                    </Label>
                    <Input id="course-title" value={newCourseTitle} onChange={(e) => setNewCourseTitle(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="course-description" className="text-right">
                      Description
                    </Label>
                    <Input id="course-description" value={newCourseDescription} onChange={(e) => setNewCourseDescription(e.target.value)} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={addCourse}>Add</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{course.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => {
                        setEditingCourse(course)
                        setEditingTitle(course.title)
                        setEditingDescription(course.description)
                        setShowEditCourseDialog(true)
                      }}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                      <Button variant="destructive" onClick={() => deleteCourse(course.id)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Dialog open={showEditCourseDialog} onOpenChange={setShowEditCourseDialog}>
              <DialogHeader>
                <DialogTitle>Edit Course</DialogTitle>
                <DialogDescription>
                  Update course details.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-course-title" className="text-right">
                    Title
                  </Label>
                  <Input id="edit-course-title" value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-course-description" className="text-right">
                    Description
                  </Label>
                  <Input id="edit-course-description" value={editingDescription} onChange={(e) => setEditingDescription(e.target.value)} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={editCourse}>Update</Button>
              </DialogFooter>
            </Dialog>
          </>
        ) : (
          <p className="text-center text-gray-500">Please log in to manage courses.</p>
        )}
      </main>

      <footer className="bg-muted mt-8">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2023 Course Management App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
