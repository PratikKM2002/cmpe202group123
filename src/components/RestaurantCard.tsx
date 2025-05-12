import { Button } from "./ui/button";
import Image from 'next/image';

type Restaurant = {
  id: number;
  name: string;
  description: string;
  address: string;
  cuisine: string;
  priceRange: string;
  ratings: number;
  imageUrl: string;
};

type RestaurantGridProps = {
  restaurants: Restaurant[];
  onEditClick?: (restaurant: Restaurant) => void;
  onDeleteClick?: (id: number) => void;
  isAdmin?: boolean; 
  isBusinessOwner?: boolean;
};

export default function RestaurantCard({ restaurants, onDeleteClick, onEditClick, isAdmin, isBusinessOwner }: RestaurantGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="border rounded p-4 shadow hover:shadow-lg">
          <div className="relative w-full h-48">
            <Image
              src={restaurant.imageUrl || '/placeholder-restaurant.jpg'}
              alt={restaurant.name}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
          <h3 className="text-lg font-semibold truncate">{restaurant.name}</h3>
          <p className="truncate">{restaurant.description}</p>
          <p className="truncate">
            <strong>Address:</strong> {restaurant.address}
          </p>
          <p className="truncate">
            <strong>Cuisine:</strong> {restaurant.cuisine}
          </p>
          <p className="truncate">
            <strong>Price Range:</strong> {restaurant.priceRange}
          </p>
          <p>
            <strong>Ratings:</strong> {restaurant.ratings} ★
          </p>
          {isAdmin && (
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => onDeleteClick?.(restaurant.id)}
                className="bg-red-500 text-white py-1 px-3 rounded">Delete</button>
            </div>
          )}
          {isBusinessOwner && (
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                onClick={() => onEditClick?.(restaurant)}
              >
                Edit
              </Button>
              <Button 
                onClick={() => onDeleteClick?.(restaurant.id)}
                variant="destructive">Delete</Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
