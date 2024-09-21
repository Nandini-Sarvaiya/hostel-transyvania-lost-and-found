import Image from 'next/image'
import { X } from 'lucide-react'

// Remove the import for the Button component, we'll create a simple button instead
// import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface Item {
  id: string;
  image: string;
  description: string;
  name: string;
  contact: string;
}

interface ItemCardProps extends Item {
  onRemove: (id: string) => void
}

export function ItemCard({ id, image, description, name, contact, onRemove }: ItemCardProps) {
  return (
    <Card className="w-64 h-80 m-4 overflow-hidden relative transform transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={description}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 truncate">{description}</CardTitle>
        <p className="text-sm text-gray-600 truncate">Lost by: {name}</p>
        <p className="text-sm text-gray-600 truncate">Contact: {contact}</p>
      </CardContent>
      <CardFooter className="absolute top-2 right-2">
        <button
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={() => onRemove(id)}
        >
          <X className="h-4 w-4" />
        </button>
      </CardFooter>
    </Card>
  )
}