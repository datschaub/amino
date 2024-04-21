"use client";

import { useRef } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { useState } from "react";
import { LivsmedelCompare } from "~/lib/models/livsmedel";
import { Separator } from "~/components/ui/separator";
import { Label } from "~/components/ui/label";

export const ProteinCalc: React.FC = () => {
  // Define a ref for the counter
  const comparisonCounter = useRef<number>(0);
  const [comparisons, setComparisons] = useState<LivsmedelCompare[]>([
    { id: comparisonCounter.current, namn: "", protein: 0, kcal: 0 },
  ]);

  const sortedComparisons = [...comparisons].sort(
    (a, b) => (a.kcalPerProtein ?? 0) - (b.kcalPerProtein ?? 0),
  );

  const formSchema = z.object({
    namn: z.array(
      z
        .string({
          required_error: "Namn är obligatoriskt",
        })
        .min(1, { message: "Namn behöver vara minst 1" }),
    ),
    kcal: z.array(
      z.coerce
        .number({
          required_error: "Kalorier är obligatoriskt",
          invalid_type_error: "Kalorier måste vara ett nummer",
        })
        .int()
        .min(1, { message: "Kalorier behöver vara minst 1" }),
    ),
    protein: z.array(
      z.coerce
        .number({
          required_error: "Protein är obligatoriskt",
          invalid_type_error: "Protein måste vara ett nummer",
        })
        .int()
        .min(1, { message: "Protein behöver vara minst 1" }),
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   kcal: [0],
    //   protein: [0],
    // },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setComparisons((prevComparisons) =>
      prevComparisons.map((comparison) => ({
        ...comparison,
        namn: values.namn[comparison.id] ?? "",
        kcal: values.kcal[comparison.id] ?? 0,
        protein: values.protein[comparison.id] ?? 0,
        kcalPerProtein:
          values.protein[comparison.id] !== 0
            ? Number(
                (
                  (values.kcal[comparison.id] ?? 0) /
                  (values.protein[comparison.id] ?? 0)
                )?.toFixed(2),
              )
            : 0,
      })),
    );
  }

  const addComparison = () => {
    const newId = ++comparisonCounter.current;
    setComparisons((prevComparisons) => [
      ...prevComparisons,
      { id: newId, namn: "", protein: 0, kcal: 0 },
    ]);
  };

  const removeComparison = (id: number) => {
    setComparisons((prevComparisons) =>
      prevComparisons.filter((item) => item.id !== id),
    );

    // Reset the form state for the removed comparison
    form.reset({
      ...form.getValues(), // preserve the values of the other fields
      [`namn.${id}`]: "", // reset the namn field of the removed comparison
      [`protein.${id}`]: "", // reset the protein field of the removed comparison
      [`kcal.${id}`]: "", // reset the kcal field of the removed comparison
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Kcal/protein-kalkylator</CardTitle>
            <CardDescription>
              Räknar ut hur många kalorier ett livsmedel innehåller per gram
              protein. Ett gram protein är 4 kcal.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:flex-row">
            {comparisons.map((comparison) => {
              return (
                <Card key={comparison.id} className="">
                  <CardContent className="space-y-2 p-4">
                    <FormField
                      control={form.control}
                      name={`namn.${comparison.id}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="email">Livsmedel</Label>
                              <Input
                                type="text"
                                placeholder="Sojabönor"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`kcal.${comparison.id}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="email">Kcal</Label>
                              <Input type="number" placeholder="0" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`protein.${comparison.id}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="email">Protein</Label>
                              <Input type="number" placeholder="0" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="border-t p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={comparisons.length <= 1}
                      onClick={() => removeComparison(comparison.id)}
                    >
                      <Trash2 className={`h-3.5 w-3.5`} />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </CardContent>
          <div className="p-4 pt-0">
            <Button
              size="sm"
              variant="ghost"
              className="gap-1"
              type="button"
              onClick={addComparison}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Lägg till livsmedel
            </Button>
          </div>
          <CardFooter className="flex-col justify-center gap-2 border-t p-4">
            <Button className="" type="submit">
              Räkna ut
            </Button>
          </CardFooter>
        </Card>
        <Card className="mt-2">
          <CardHeader>
            <CardTitle>Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="font-medium">
                  <TableCell>#</TableCell>
                  <TableCell>Livsmedel</TableCell>
                  <TableCell>Kcal/gram protein</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedComparisons.map((comparison, index) => (
                  <TableRow key={comparison.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{comparison.namn}</TableCell>
                    <TableCell>{comparison.kcalPerProtein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
